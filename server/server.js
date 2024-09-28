'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, 'images')));


app.use(bodyParser.json());

// Пример GET-запроса для получения всех пользователей
app.get('/api/users', (req, res) => {
    // Логика для получения пользователей
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];
    res.status(200).json(users);
});

// Пример GET-запроса для получения пользователя по ID
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    // Логика для получения пользователя по ID
    const user = { id: userId, name: 'Alice', email: 'alice@example.com' }; // Пример
    res.status(200).json(user);
});

// Пример POST-запроса для создания нового пользователя
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    // Логика для сохранения нового пользователя
    //console.log("Создан пользователь: ${name}, Email: ${email}");
    res.status(201).json({ message: 'Пользователь успешно создан!', data: { name, email } });
});

// Пример POST-запроса для обновления пользователя
app.post('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    // Логика для обновления пользователя по ID
    //console.log(Обновлен пользователь ID ${userId}: ${name}, Email: ${email});
    res.status(200).json({ message: 'Пользователь успешно обновлен!', data: { id: userId, name, email } });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
