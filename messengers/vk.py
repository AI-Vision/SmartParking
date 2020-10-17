import json
import requests
import config
import random
from recieving_info import parks_request, form_answer

async def answer_message(user):
    list_of_parks = parks_request(user['user_id'], 'VK')
    params = {
        'access_token': config.vk_token,
        'peer_id': user['user_id'],
        'random_id': round(random.random() * 999999),
        'message':'',
        'v': 5.92
        }
    if list_of_parks['status'] == 'Error':
        params['message'] = 'У вас нет доступа! Пожалуйста, авторизуйтесь на сайте'
        await requests.post('https://api.vk.com/method/messages.send',
                            data=json.dumps(params))
    else:
        for park in list_of_parks['data']['parking_ids']:
            params['message'] = form_answer(park)
            await requests.post('https://api.vk.com/method/messages.send',
                                data=json.dumps(params))
    return 200
