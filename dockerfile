# Используем официальный образ Node.js версии 20
FROM node:20.17.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости
RUN npm install express --save

RUN npm i cors 
RUN npm install handlebars
# Копируем остальные файлы приложения
COPY . .

# Открываем порт 80
EXPOSE 80

# Команда для запуска приложения

CMD ["node", "server/server.js"]
