from flask import Flask,render_template,url_for,request,jsonify
from flask_cors import CORS, cross_origin
import pickle
#from sklearn.externals import joblib
import numpy as np
import openai
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from torch.utils.data import DataLoader, Dataset
#######################################################################
tokenizer = AutoTokenizer.from_pretrained("unitary/toxic-bert")

model = AutoModelForSequenceClassification.from_pretrained("unitary/toxic-bert")
#################################################
###################################################
app = Flask(__name__)
cors = CORS(app)
###################################################
openai.api_key = "XXXXXXXXenter your keyXXXXXX"
###################################################
class_names=['toxic', 'severe_toxic', 'obscene', 'threat', 'insult','identity_hate']
def inference(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    out = model(**inputs)[0]
    scores = torch.sigmoid(out).cpu().detach().numpy()
    print(scores)
    results = {}
    for i in range(len(class_names)):
        results[class_names[i]]=scores[0][i]
    return results
##############################################################
@app.route('/')
def home():
	return jsonify({'data': 'hello world'})

@app.route('/predict',methods=['POST'])
def predict():
    if request.method == 'POST':
        message = request.data
        print(message)
        data = message.decode()
        results = inference(data)
        ind=np.argmax(np.array(results.values()))
        if list(results.values())[ind]<0.6:
            my_prediction='non toxic'
        else:
            my_prediction=list(results.keys())[ind]
        ###################################################
        
        response_senti = openai.Completion.create(
        model="text-davinci-003",
        prompt="Classify the sentiment in these tweet:\n\n"+data,
        temperature=0,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0)
        ##################################################
        response_topi = openai.Completion.create(
        model="text-davinci-003",
        prompt="Extract keywords from this text:\n\n"+data,
        temperature=0.5,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.8,
        presence_penalty=0.0)
        #########################################################
    return jsonify({'prediction': my_prediction,'sentiment':response_senti.choices[0]['text'].replace('\n',''),'topic':response_topi.choices[0]['text'].replace('\n',' ')})
############################################################################

@app.route('/grammer',methods=['POST'])
def grammer():
    if request.method == 'POST':
        message = request.data
        print(message)
        data = message.decode()
        results = inference(data)
        ind=np.argmax(np.array(results.values()))
        if list(results.values())[ind]<0.6:
            my_prediction='non toxic'
        else:
            my_prediction=list(results.keys())[ind]
        ###################################################
        response_gram = openai.Completion.create(
        model="text-davinci-003",
        prompt="Correct this to standard English:\n\n"+data,
        temperature=0,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0)
        ##################################################
        response_senti = openai.Completion.create(
        model="text-davinci-003",
        prompt="Classify the sentiment in these tweet:\n\n"+data,
        temperature=0,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0)
        ####################################################
        response_topi = openai.Completion.create(
        model="text-davinci-003",
        prompt="Extract keywords from this text:\n\n"+data,
        temperature=0.5,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.8,
        presence_penalty=0.0)
        #########################################################
    return jsonify({'is_it_toxic': my_prediction,'sentiment':response_senti.choices[0]['text'].replace('\n',''),'topic':response_topi.choices[0]['text'].replace('\n',' '),'grammer':response_gram.choices[0]['text'].replace('\n',' ')})    



if __name__ == '__main__':
	app.run(debug=True)