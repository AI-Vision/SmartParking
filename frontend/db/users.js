const db = require('./index')

/**
 * Получить пользователя по id
 * @param {Number} id - id пользователя
 */
exports.getById = async function(id) {
    const rows = await db.async_query('SELECT * FROM users WHERE id = ?', [id]);

    return JSON.parse(JSON.stringify(rows))[0];
}

/**
 * Получить данные пользователя по его id в социальной сети
 * @param {Number} social_id  - id в социальной сети
 * @param {String} social_tag - краткое название социальной сети (VK, TG, OK, ...)
 */
exports.getByMessengers = async function(social_id, social_tag) {
    const sql = `SELECT users.user_id, name, login, parking_ids
                 FROM users
                 INNER JOIN integrations
                    ON integrations.user_id = users.user_id
                 WHERE integrations.social_id  = ?
                   AND integrations.social_tag = ?`;
    const rows = await db.async_query(sql, [social_id, social_tag]);

    return JSON.parse(JSON.stringify(rows))[0];
}

/**
 * Получить пользователя по логину
 * @param {String} login - логин пользователя
 */
exports.getByLogin = async function(login) {
    const rows = await db.async_query('SELECT * FROM users WHERE login = ?', [login]);

    return JSON.parse(JSON.stringify(rows))[0];
}

/**
 * Добавить пользователя
 * @param {String} login     - логин
 * @param {String} password  - пароль
 * @param {Number} name      - имя пользователя
 */
exports.add = async function(login, password, name) {
    await db.async_query('INSERT INTO users(login, password, name) VALUES(?, ?, ?)', [login, password, name]);
}