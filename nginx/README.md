## Установка

```bash
apt-get update
apt-get install -y nginx
```

## Запуск

```bash
nginx -c /nginx/nginx.conf
```

## Остановка

```bash
kill $(cat /run/nginx.pid)
```
