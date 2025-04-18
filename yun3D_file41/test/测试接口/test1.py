import requests

url = "http://127.0.0.1:9001/index?ts_sign=111&ticket=111&prvkey=111&csr=111"

data = {}
headers = {
    'Pragma': 'no-cache',
    'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
}
# ‪C:\Users\Administrator\Desktop\6.stl
response = requests.request("GET", url, headers=headers, data=data)

print(response.json())
