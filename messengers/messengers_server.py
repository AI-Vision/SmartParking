from flask import Flask, request
import requests
import config
import vk
import whatsapp
import telegram
import ok
app = Flask(__name__)

print(whatsapp.create_webhook())
print(telegram.create_webhook())
print(ok.create_webhook())

@app.route('/messengers/telegram', methods=['POST', 'PUT', 'GET'])
async def answer_tg():
    data = request.json()
    await telegram.answer_message(data['message']['from'])

@app.route('/messengers/vk', methods=['POST', 'PUT', 'GET'])
async def answer_vk():
    data = request.json()
    if data['type'] == 'message_new':
        await vk.answer_message(data['object'])

@app.route('/messengers/ok', methods=['POST', 'PUT', 'GET'])
async def answer_ok():
    data = request.json()
    if data["webhookType"] == 'MESSAGE_CREATED':
        await ok.answer_message(data)

@app.route('/messengers/whatsapp', methods=['POST', 'PUT', 'GET'])
async def answer_whatsapp():
    data = request.json()
    if 'messages' in data.keys() and len(data['messages']) > 0:
        await whatsapp.manage_messages(data['messages'])

if __name__ == '__main__':
    app.run(port=30)
