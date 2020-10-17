const cookie = require('cookie');
const parser = require('cookie-parser');

const db = require('../../db');

/**
 * Авторизация для WebSocketServer
 * 1. Получаем куки из запроса
 * 2. Расшифровываем куки
 * 3. Получаем данные о пользователе в БД
 * 4. Получаем пользователя
 *
 * @param  {Object} headers - заголовки ws
 * @return {Object} данные пользователя или null
 */
module.exports = async function(headers) {
    const cookies    = cookie.parse(headers.cookie);
    const session_id = parser.signedCookie(cookies["connect.sid"], /** secret */ 'KJjsdz');

    return new Promise(resolve => {
        db.sessions.get(session_id, async (err, session) => {
            if (err) return resolve(null);

            const user_id = session.passport.user;
            const user = await db.users.getById(user_id);

            return resolve(user);
        });
    })
}