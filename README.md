# chatGPT for text Analysis 
In this repository I have made an effort of integrating chrome extension with chatgpt. This extension performs two tasks
## 1. Evaluating each tweets toxicity, sentiment and topics coveerd

![image](https://user-images.githubusercontent.com/22698201/223541189-d4f0dd11-60f9-43ed-af04-25c3a0af8cbd.png)

## 2. It also evaluates the tweets which we are going to write.

![image](https://user-images.githubusercontent.com/22698201/223541816-f98afba1-4281-4095-a0d0-a06405169fc3.png)

In this project,  I have used two models:
- chatGPT Model: for validating the grammer, tweets sentiment analysis and topic extraction. For more details refer: [Open-AI Examples](https://platform.openai.com/examples). 
- BERT Model: for determining toxicity in the tweet. For more details refer: [Hugging Face Toxic-BERT Model](https://huggingface.co/unitary/toxic-bert)

All the extension related files are stored in the plugin folder while all the server related files are stored in the other folder.
### **Note:** I have used scroll as an event so results only populates if you scroll up or down.
### This is being tested for further improvement
