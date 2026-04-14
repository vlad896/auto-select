-- Выполните в phpMyAdmin (cPanel) для выбранной базы данных.
-- Префикс имени БД у хостера может отличаться — выберите свою БД перед запуском.

CREATE TABLE IF NOT EXISTS leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  source ENUM('contact', 'quiz') NOT NULL,
  name VARCHAR(100) NULL,
  phone VARCHAR(32) NOT NULL,
  answers_json JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_agent VARCHAR(512) NULL,
  page_url VARCHAR(2048) NULL,
  PRIMARY KEY (id),
  KEY idx_leads_created_at (created_at),
  KEY idx_leads_source (source)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
