from flask import Flask, request
import requests

app = Flask(__name__)
@app.route('/messengers/vk:30', methods=['POST', 'GET'])
def authorization():
    data = request.data;
    print(data)
    return '213d5ff5'

if __name__ == '__main__':
    app.run(port=30)
