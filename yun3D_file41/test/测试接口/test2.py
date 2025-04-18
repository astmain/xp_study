import requests

url = "http://127.0.0.1:9001/file_parse"

headers = {
    'Pragma': 'no-cache',
    'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
}
data = {}
params = {'id': 1, 'path_file': r'C:\Users\Administrator\Desktop\6.stl'}

response = requests.request("GET", url, headers=headers, params=params, data=data)

print(response.json())
