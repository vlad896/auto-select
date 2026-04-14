# Leads setup on cPanel (MySQL)

This project stores leads in MySQL through server actions.

## 1. Create DB and user in cPanel

1. Open **MySQL Databases** in cPanel.
2. Create a new database.
3. Create a dedicated DB user.
4. Add user to DB with **ALL PRIVILEGES**.

## 2. Apply SQL schema

1. Open **phpMyAdmin**.
2. Select the database you created.
3. Run SQL from `scripts/schema-leads.sql`.
4. Confirm tables exist:
   - `leads`
   - `lead_events`
   - `lead_notes`
   - `lead_rate_limit_hits`

## 3. Production environment variables

Set these values in your server environment:

- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_NAME`
- `ADMIN_BASIC_USER`
- `ADMIN_BASIC_PASSWORD`
- `TELEGRAM_BOT_TOKEN` (optional)
- `TELEGRAM_CHAT_ID` (optional)

Use `.env.example` as the reference.

## 4. Smoke test

1. Submit contact form on production.
2. Verify row in `leads`.
3. Verify row in `lead_events` with `event_type = created`.
4. Open `/admin/leads` with basic auth credentials.
5. Change lead status and add a note.
6. Confirm `lead_events`/`lead_notes` rows are created.

## 5. Backups

Configure daily database backup in cPanel:

- **Backup Wizard** or **Cron + mysqldump**.
- Keep at least 7 daily backups.

