const express = require('express');
const router = express.Router();

const config = require('../config.js');
const db     = require('../db');

// Доступные функции API:
// 1. Получить данные о пользователе по его id в социальной сети
// 2. Получить данные о доступные парковках пользователя

// Каждый API запрос должен содержать ключ
router.get('*', (req, res, next) => {
    if (!req.query.access_key || req.query.access_key != config.api.access_key) {
        return res.json({
            status: 'Error',
            description: 'Incorrect access key'
        })
    }
    next();
})

/**
 * Получить данные о пользователе по его id в социальной сети
 * @param {Number} social_id  - id в социальной сети
 * @param {String} social_tag - краткое название социальной сети (VK, TG, OK, ...)
*/
router.get('/profile/integration', async function(req, res) {
    if (!req.query.social_id || !req.query.social_tag) {
        return res.json({
            status: 'Error',
            description: 'Incorrect parameters'
        })
    }
    const user = await db.users.getByMessengers(req.query.social_id, req.query.social_tag);
    if (user) {
        return res.json({
            status: 'Success',
            data: user
        })
    }else {
        return res.json({
            status: 'Error',
            data: 'User not found'
        })
    }
})

/**
 * Получить данные о доступных парковках пользователя
 * @param {Number} user_id - id пользователя в системе
 */
router.get('/parking', async function(req, res) {
    if (!req.query.user_id) {
        return res.json({
            status: 'Error',
            description: 'Incorrect parameters'
        })
    }
    const parkings = await db.parking.getUserParking(req.query.user_id);

    res.json({
        status: 'Success',
        data: parkings
    })
})

module.exports = router;
