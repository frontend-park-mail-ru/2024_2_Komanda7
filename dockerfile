FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Сначала копируем только файлы package.json
COPY package*.json ./

# Устанавливаем ВСЕ зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Собираем приложение webpack'ом
RUN npm run build

# Открываем порт 80
EXPOSE 80

# Команда для запуска приложения
CMD ["npm", "start"]