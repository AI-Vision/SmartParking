const db = require('./index')

/**
 * Получить информацию о парковках пользователя
 * @param {Number} user_id - id пользователя
 */
exports.getUserParking = async function(user_id) {
    // Получаем пользователя, чтобы узнать какие парковки доступны для него
    const user = await db.async_query('SELECT * FROM users WHERE user_id = ?', [user_id]);
    const parking_ids = JSON.parse(user[0].parking_ids);
console.log(parking_ids);
    // Если нет парковок, то возвращаем пустой массив
    if (!parking_ids.length) return [];

    // Плохой код, но для MVP сойдет
    // Формируем выборку по всем id;
    const where = 'WHERE parking_id = ' + parking_ids.join(' OR parking_id = ');

    const sql = `SELECT * FROM parking ${where}`;
    console.log(sql);

    const rows = await db.async_query(sql);

    return JSON.parse(JSON.stringify(rows));
}