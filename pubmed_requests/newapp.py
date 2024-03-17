import os
import requests
from groq import Groq
from PIL import Image
import streamlit as st
import google.generativeai as genai

# Load API Keys (Replace with your actual keys)
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY") 
GROK_API_KEY = os.environ.get("GROK_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
client = Groq(api_key=GROK_API_KEY)

# ... (Your other helper functions) ...

def extract_insights_from_gemini(gemini_response):
    # Extract insights from JSON response
    return gemini_response.get("image_understanding", "") 

def prepare_abstracts_for_llm(query, num_results): 
    apiUrl = 'https://nirakar09.pythonanywhere.com/'
    params = {'query': query, 'num_results': num_results}
    response = requests.get(apiUrl, params=params)

    if response.status_code == 200:
        data = response.json()
        abstracts = [result.get('Abstract', '') for result in data.get('results', [])]
        return "\n\n".join(abstracts)
    else:
        raise Exception(f"Request failed with status code: {response.status_code}") 

def answer_question_with_abstracts(question, image_insights, abstracts): # Modified
    groq_prompt = f"""
    Your job is to answer the questions based on the given image analysis, abstracts, and the question from the doctor. You are a medical helper to the doctor, analyzing the symptoms and providing preliminary care:

    Image Analysis: {image_insights}

    Abstracts: {abstracts}

    Question: {question} 
    Answer: """

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": groq_prompt}],
        model="mixtral-8x7b-32768"  # Or your preferred model
    )
    return response.choices[0].message.content 

# Streamlit Interface
st.header("Doctor Copilot")
text_input = st.text_input("Describe Symptoms:")
image_file = st.file_uploader("Upload Image (Optional):")
analysis_type = st.selectbox("Choose Analysis Type:", 
                             ["Text-Based Analysis", "Image-Based Analysis", "Combined Analysis"])

if st.button("Analyze"):
    if analysis_type == "Text-Based Analysis":
        query = text_input
        abstracts = prepare_abstracts_for_llm(query, 3)
        answer = answer_question_with_abstracts(question="Can you elaborate on this condition?", image_insights="", abstracts=abstracts)  # Example question
        st.write(answer)

    elif analysis_type == "Image-Based Analysis":
         image_data = input_image_setup(image_file)  # Assuming you have this function
         gemini_response = get_gemini_response(input_prompt, image_data, "") 
         image_insights = extract_insights_from_gemini(gemini_response)
         st.write("Image Analysis Insights:")
         st.write(image_insights)

    elif analysis_type == "Combined Analysis":
        # ... Combine image insights with text-based analysis ...
        image_data = input_image_setup(image_file) 
        gemini_response = get_gemini_response(input_prompt, image_data, "") 
        image_insights = extract_insights_from_gemini(gemini_response)

        query = text_input + " " + image_insights  # Refine query 
        abstracts = prepare_abstracts_for_llm(query, 3) 
        answer = answer_question_with_abstracts(question="What is the potential diagnosis?", image_insights=image_insights, abstracts=abstracts)
        st.write("Combined Analysis:")
        st.write(answer) 
