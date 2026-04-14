-- Выполните в phpMyAdmin (cPanel) для выбранной базы данных.
-- Префикс имени БД у хостера может отличаться — выберите свою БД перед запуском.

CREATE TABLE IF NOT EXISTS leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  source ENUM('contact', 'quiz') NOT NULL,
  status ENUM('new', 'in_progress', 'won', 'lost') NOT NULL DEFAULT 'new',
  assignee VARCHAR(100) NULL,
  name VARCHAR(100) NULL,
  phone VARCHAR(32) NOT NULL,
  answers_json JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_agent VARCHAR(512) NULL,
  page_url VARCHAR(2048) NULL,
  PRIMARY KEY (id),
  KEY idx_leads_created_at (created_at),
  KEY idx_leads_source (source),
  KEY idx_leads_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lead_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  event_type ENUM('created', 'status_changed', 'note_added', 'assigned') NOT NULL,
  event_data JSON NULL,
  actor VARCHAR(100) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_lead_events_lead_id (lead_id),
  KEY idx_lead_events_created_at (created_at),
  CONSTRAINT fk_lead_events_lead
    FOREIGN KEY (lead_id) REFERENCES leads(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lead_notes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  note TEXT NOT NULL,
  author VARCHAR(100) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_lead_notes_lead_id (lead_id),
  KEY idx_lead_notes_created_at (created_at),
  CONSTRAINT fk_lead_notes_lead
    FOREIGN KEY (lead_id) REFERENCES leads(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lead_rate_limit_hits (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  client_ip VARCHAR(64) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_lead_rate_limit_ip_time (client_ip, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
