
import requests
url = 'http://localhost:8000/api/analyze/xray'
files = {'file': open('data/xray/test/NORMAL/NORMAL2-IM-0341-0001.jpeg', 'rb')}
try:
    response = requests.post(url, files=files)
    print('Status Code:', response.status_code)
    print('Response:', response.text[:200])
except Exception as e:
    print('Error:', e)
