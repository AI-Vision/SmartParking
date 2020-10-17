import json
import requests
import config
from recieving_info import parks_request, form_answer
def create_webhook():
    print('{0}/telegram'.format(config.url))
    print('https://api.telegram.org/bot{token}/setWebhook'.format(token=config.telegram_token))
    response = requests.post('https://api.telegram.org/bot{token}/setWebhook'.format(token=config.telegram_token),
                  data=json.dumps({'url': '{0}/telegram'.format(config.url)}), headers= {'Content-Type': 'application/json'})
    return str(response) + 'tg'

async def answer_message(user):
    list_of_parks = parks_request(user['username'], 'TG')
    if list_of_parks['status'] == 'Error':
        await requests.post('https://api.telegram.org/bot{0}/sendMessage'.format(config.telegram_token),
                            data=json.dumps({'chat_id': user['id'],
                                             'text': 'У вас нет доступа! Пожалуйста, авторизуйтесь на сайте.'}))
    else:
        for park in list_of_parks['data']['parking_ids']:
            await requests.post('https://api.telegram.org/bot{0}/sendMessage'.format(config.telegram_token),
                                data=json.dumps({
                                    'chat_id':user['id'],
                                    'text': form_answer(park)
                                    }))
    return 200
