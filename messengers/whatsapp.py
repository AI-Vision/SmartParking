import json
import requests
import config
from recieving_info import parks_request, form_answer
def create_webhook():
    response = requests.post('{0}webhookUrl'.format(config.whatsapp_url), data=json.dumps({'webhookUrl':config.url + '/whatsapp'}))
    return response

async def manage_messages(request):
    for message in request:
        if not message['fromMe']:
            await answer_message(message)

async def answer_message(user):
    list_of_parks = parks_request(user['chatId'][:user['chatId'].index('@')], 'WA')
    if list_of_parks['status'] == 'Error':
        await requests.post('{0}sendMessage?token={1}'.format(config.whatsapp_url, config.whatsapp_token),
                            data=json.dumps({'chatId': user['chat_id'],
                                             'body': 'У вас нет доступа! Пожалуйста, авторизуйтесь на сайте.'}))
    else:
        for park in list_of_parks['data']['parking_ids']:
            await requests.post('{0}sendMessage?token={1}'.format(config.whatsapp_url, config.whatsapp_token),
                                data=json.dumps({
                                    'chatId': user['chat_id'],
                                    'body': form_answer(park)
                                    }))
    return 200
