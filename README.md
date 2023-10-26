# ChatGPT for text Analysis 
Welcome to the chatGPT Text Analysis repository, where we've integrated a Chrome extension with chatGPT. This extension serves two key functions:

## Features:
### 1. **Twitter Feed Analysis**:
Our extension analyzes tweets to assess their toxicity, sentiment, and the topic category which is being discussed.
![image](https://user-images.githubusercontent.com/22698201/223541189-d4f0dd11-60f9-43ed-af04-25c3a0af8cbd.png)

### 2. **Real-time Tweet Analysis**:
It also help you to evaluate your tweet planning to post. Thus, ensures you meet your desired criteria.
![image](https://user-images.githubusercontent.com/22698201/223541816-f98afba1-4281-4095-a0d0-a06405169fc3.png)

## Models Used:
In this project,  we leverage two powerful models to bring you these capabilities::
- **ChatGPT Model**: for validating the grammer, tweets sentiment analysis and topic extraction. For more details refer: [Open-AI Examples](https://platform.openai.com/examples). 
- **BERT Model**: for determining toxicity in the tweet. For more details refer: [Hugging Face Toxic-BERT Model](https://huggingface.co/unitary/toxic-bert)

## Project Structure

- **Plugin Folder**: Contains all files related to the Chrome extension.
- **Server Folder**: Stores files relevant to the server-side functionality.

### Important Note
- We've implemented a scroll event mechanism to optimize performance. Results will populate as you scroll up or down your Twitter feed.
<br></br>
This project is actively tested and under development, with the goal of continual improvement.
Feel free to contribute, report issues, or suggest enhancements to make this extension even more valuable for the Twitter community.
