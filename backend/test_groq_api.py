import os
from dotenv import load_dotenv, find_dotenv
import groq

env_path = find_dotenv()
print('Found .env at:', env_path)
load_dotenv(env_path)

key = os.environ.get('GROQ_API_KEY')
if not key:
    print('GROQ_API_KEY is missing.')
else:
    print('GROQ_API_KEY is loaded. Length:', len(key))
    try:
        client = groq.Groq(api_key=key)
        response = client.chat.completions.create(
            messages=[{'role': 'user', 'content': 'Output valid JSON: {"status": "ok"}'}],
            model='llama3-8b-8192',
            temperature=0,
            response_format={'type': 'json_object'}
        )
        print('Groq Success:', response.choices[0].message.content)
    except Exception as e:
        print('Groq Error:', type(e).__name__, '-', str(e))
