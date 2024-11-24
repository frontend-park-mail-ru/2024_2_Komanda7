# Название Docker-образа
IMAGE_NAME_FRONT="kudago_front"

# Название порта
HOST_PORT=80
CONTAINER_PORT=80

# Останавливаем контейнер с тем же образом, если он запущен
echo "Остановка старого контейнера..."
OLD_CONTAINER_ID_FRONT=$(sudo docker ps -q --filter ancestor=$IMAGE_NAME_FRONT)

if [ -n "$OLD_CONTAINER_ID_FRONT" ]; then
    echo "Найден контейнер $OLD_CONTAINER_ID_FRONT. Останавливаю..."
    sudo docker stop $OLD_CONTAINER_ID_FRONT
    sudo docker rm $OLD_CONTAINER_ID_FRONT
else
    echo "Активных контейнеров с образом $IMAGE_NAME не найдено."
fi


# Выполняем git pull для обновления проекта
echo "Обновляю проект с git..."
sudo git pull origin deploy || { echo "Не удалось выполнить git pull"; exit 1; }

# Собираем новый Docker-образ
echo "Сборка Docker-образа..."
sudo docker build -t $IMAGE_NAME_FRONT . || { echo "Не удалось собрать Docker-образ"; exit 1; }

# Запуск нового контейнера
echo "Запуск нового контейнера..."
sudo docker run -d --restart unless-stopped -p $HOST_PORT:$CONTAINER_PORT $IMAGE_NAME_FRONT || { echo "Не удалос>

echo "Контейнер успешно обновлен и запущен."

