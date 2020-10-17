# БД

## Таблицы

### Users

```sql
CREATE TABLE parking.users (
  user_id int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Уникальный идентификатор пользователя в системе',
  name varchar(50) NOT NULL DEFAULT '' COMMENT 'Имя пользователя',
  parking_ids varchar(256) NOT NULL DEFAULT '[]' COMMENT 'JSON список доступных парковок',
  login varchar(32) NOT NULL DEFAULT '' COMMENT 'Логин пользователя',
  password varchar(32) NOT NULL DEFAULT '' COMMENT 'Хэш пароля с солью',
  PRIMARY KEY (user_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 3,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;
```

### Integrations

```sql
CREATE TABLE parking.integrations (
  user_id varchar(255) NOT NULL DEFAULT '',
  social_id varchar(16) NOT NULL DEFAULT '' COMMENT 'id пользователя в мессенджере',
  social_tag varchar(6) NOT NULL DEFAULT '' COMMENT 'Тэг соц. сети или мессенджера (VK, TG, OK, ...)',
  PRIMARY KEY (user_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = 'Интеграция пользователя с мессенджерами и соц. сетями';
```

### Parkings

```sql
CREATE TABLE parking.parking (
  parking_id int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL DEFAULT '' COMMENT 'Описание парковки, например адрес',
  position varchar(32) NOT NULL DEFAULT '' COMMENT 'LatLng координаты парковки в формате lat:lng',
  polygon text DEFAULT NULL COMMENT 'Точки на карте, в формате lat1:lng1:lat2:lng2:...',
  free_spaces int(4) UNSIGNED NOT NULL COMMENT 'Количество свободных мест. Равно сумме free_spaces у камер',
  PRIMARY KEY (parking_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;
```

### Cameras

```sql
CREATE TABLE parking.cameras (
  camera_id int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Уникальный идентификатор камеры в системе',
  parking_id int(8) NOT NULL,
  description varchar(50) DEFAULT '' COMMENT 'Описание камеры',
  free_spaces int(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Количество свободных парковочных мест',
  PRIMARY KEY (camera_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;
```
