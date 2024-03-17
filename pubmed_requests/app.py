import os
import requests
from groq import Groq
from PIL import Image  
import gemini  
import google-generativeai as genai


# Groq Setup 
groq_api_key = os.environ.get("GROK_API_KEY", "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") 
client = Groq(api_key=api_key)

# Gemini Setup
GEMINI_API_KEY = "AIzaSyAtl0EsC3qIZxw-5VHFZWH9aNrrIcbta-s"
GEMINI_MODEL_ID = "gemini-pro-vision"
gemini_client = gemini.Client(GEMINI_API_KEY)
gemini_model = gemini_client.models.load(GEMINI_MODEL_ID)

# ... (Your functions for prepare_abstracts_for_llm)

def answer_question_with_abstracts(model="mixtral-8x7b-32768"):
    question = input("What is your question? ")
    query = input("Enter your search keywords: ")
    num_results = int(input("Enter the number of abstracts to search: "))
    image_file = input("Path to image file: ")  # Get image input

    # Image Processing
    try:
        img = Image.open(image_file).convert('RGB') 
        # ... (Preprocessing if needed)
        image_analysis = gemini_model.predict(image=img)  

        # Example: Assuming object detection
        detected_objects = image_analysis.get('objects', [])  
    except Exception as e:
        print(f"Image processing or Gemini analysis failed: {str(e)}")
        detected_objects = []

    # PubMed + Image Analysis
    abstracts = prepare_abstracts_for_llm(query, num_results)

    groq_prompt = f"""
    Your job is to answer the questions based on the given abstracts and image analysis. You are a medical helper to the doctor, analysing the symptoms and providing preliminary care:

    Image Analysis:
       * {detected_objects} 

    Abstracts: {abstracts}

    Question: {question} 
    Answer: """

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": groq_prompt}],
        model=model
    )

    return response.choices[0].message.content 

if __name__ == "__main__": 
    answer = answer_question_with_abstracts()
    print(answer)
