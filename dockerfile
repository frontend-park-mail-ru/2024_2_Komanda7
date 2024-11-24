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

# Запускаем команду Handlebars
RUN node ./node_modules/handlebars/bin/handlebars public/components/EditEventForm/EditEventForm.hbs -f public/components/EditEventForm/EditEventForm.precompiled.js || echo "Handlebars command failed"
RUN node ./node_modules/handlebars/bin/handlebars public/components/EventCreateForm/EventCreateForm.hbs -f public/components/EventCreateForm/EventCreateForm.precompiled.js || echo "Handlebars command failed"
RUN node ./node_modules/handlebars/bin/handlebars public/components/Login/Login.hbs -f public/components/Login/Login.precompiled.js || echo "Handlebars command failed"
RUN node ./node_modules/handlebars/bin/handlebars public/components/Nav/Nav.hbs -f public/components/Nav/Nav.precompiled.js || echo "Handlebars command failed"
RUN node ./node_modules/handlebars/bin/handlebars public/components/Register/Register.hbs -f public/components/Register/Register.precompiled.js || echo "Handlebars command failed"
RUN node ./node_modules/handlebars/bin/handlebars public/components/StatsPage/answerDiv.hbs -f public/components/StatsPage/answerDiv.precompiled.js || echo "Handlebars command failed"
# Открываем порт 80
EXPOSE 80

# Команда для запуска приложения
CMD ["node", "server/server.js"]
