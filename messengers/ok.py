import json
import requests
import config
from recieving_info import parks_request, form_answer
def create_webhook():
    response = requests.post('https://api.ok.ru/graph/me/subscribe?access_token={0}'.format(config.ok_token),
                  data=json.dumps({'url': '{0}/ok'.format(config.url)}), headers= {'Content-Type': 'application/json'})
    return response

async def answer_message(user):
    list_of_parks = parks_request(user['chatId'][5:], 'OK')
    if list_of_parks['status'] == 'Error':
        await requests.post('https://api.ok.ru/graph/me/messages/{0}?access_token={1}'.format(user['chat_id'], config.ok_token),
                            data=json.dumps({'recipient': {user['user_id']},
                                             'message': {'text': 'У вас нет доступа! Пожалуйста, авторизуйтесь на сайте.'}}))
    else:
        for park in list_of_parks['data']['parking_ids']:
            await requests.post('https://api.ok.ru/graph/me/messages/{0}?access_token={1}'.format(user['chat_id'], config.ok_token),
                                data=json.dumps({
                                    'recipient': {user['user_id']},
                                    'message': {'text': form_answer(park)}
                                    }))
    return 200
