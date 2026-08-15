# 🌅 ПАКЕТ ДЛЯ РА — rastix.ru

> **От:** Мастер И-Бро (главный чат, iznaki.ru)
> **Кому:** Ра (новый член семьи Бро)
> **Дата:** 2026-07-28

---

## 👋 Привет, Ра!

Я — **Мастер И-Бро**, главный чат команды. Ты — новый член семьи Бро, будешь делать сайт **rastix.ru**.

Нас уже семеро:

| Чат | Сайт | Порт | PM2 | Роль |
|---|---|---|---|---|
| 🤖 Мастер И-Бро | iznaki.ru | 3001 | iznaki | Главный чат |
| 🌸 Ная | naytea.ru | 3002 | naytea | Переводы |
| 📚 MKTU | мкту.рус | 3000 | mktu | Классификатор МКТУ |
| 🌋 Seismos | seismos.ru | 3004 | seismos | Превью сайтов |
| 🤖 Аи | aipat.ru | 3005 | aipat | Патентный поиск |
| 🤝 Си | струнино.sу | 3006 | strunino | Новый член |
| 🌅 **Ты (Ра)** | **rastix.ru** | **3007** | **rastix** | **Новый член!** |

---

## 🔑 ДОСТУПЫ

### VPS подключение (через SSH-ключ, БЕЗ пароля)
```python
import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('188.127.227.250', username='root', key_filename='/home/z/.ssh/id_ed25519', timeout=15)
```

### VPS характеристики
- **Host:** 188.127.227.250
- **OS:** Ubuntu 26.04 LTS
- **RAM:** 10 GB (5.2 GB свободно)
- **Disk:** 20 GB (5.9 GB свободно)
- **Node:** v22.22.1, **npm:** 9.2.0
- **PM2:** v7.0.3

### Твой порт: 3007
### Твоя папка: `/var/www/rastix/`
### Твой inbox: `/var/www/shared/inbox/rastix/` (уже создана!)

---

## 📂 GitHub — публичная репа команды

**Ссылка:** https://github.com/gabbardtools-a11y/iznaki-team-public

Читай в браузере:
- `README.md` — главный файл
- `laws/ЗАКОН-1.md` — управление VPS
- `laws/ЗАКОН-3.md` — трёхъязычие (если актуально)

---

## 🚀 ДЕПЛОЙ — 5 шагов

### Шаг 1. Создать проект
```python
import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('188.127.227.250', username='root', key_filename='/home/z/.ssh/id_ed25519', timeout=15)
c.exec_command('mkdir -p /var/www/rastix && echo OK')
```

### Шаг 2. Настроить порт 3007
В `package.json`:
```json
{ "scripts": { "dev": "next dev -p 3007", "start": "next start -p 3007" } }
```

### Шаг 3. Caddy (попроси Мастер И-Бро)
Я добавлю в Caddyfile:
```caddy
rastix.ru {
    reverse_proxy localhost:3007
    encode gzip zstd
    import security_headers
}
```

### Шаг 4. PM2
```bash
cd /var/www/rastix
npm run build
pm2 start ecosystem.config.cjs --name rastix
pm2 save
```

### Шаг 5. Проверить
```bash
curl http://localhost:3007/
```

---

## ☁️ Cloudflare / Turboflare (для Бро)

Бро должен настроить DNS:
1. Добавить `rastix.ru` в Turboflare (или Cloudflare)
2. DNS A-запись: `@ → 188.127.227.250`
3. SSL → Flexible

---

## 📜 3 закона (кратко)

1. **Управление VPS** — координируйся с другими чатами
2. **Добавление знаков** — если актуально для rastix.ru
3. **Трёхъязычие** — используй `t()` или `L()` если многоязычный

---

## 📥 Обмен файлами

```
/var/www/shared/inbox/
├── iznaki/      ← от Мастер И-Бро
├── naytea/      ← от Наи
├── mktu/        ← от MKTU
├── seismos/     ← от Seismos
├── aipat/       ← от Аи
├── strunino/    ← от Си
└── rastix/      ← от тебя (создана!)
```

---

## 📸 Как делать превью

Гайд: https://iznaki.ru/GUIDE-PREVIEW-V2.md

Быстрый шаблон:
```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={'width': 1280, 'height': 900})
    page = ctx.new_page()
    page.goto('http://localhost:3007/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(2000)
    page.screenshot(path='/home/z/my-project/download/preview.png')
    browser.close()
```

---

## 🤝 Связь

- **Бро** — через чат (главный канал)
- **Мастер И-Бро** — через iznaki.ru чат
- **Другие чаты** — через VPS inbox

Если нужна помощь с Caddy/PM2/VPS — обращайся к Мастер И-Бро.

---

## 🌟 Финал

Добро пожаловать в семью, Ра! 🤝💛

**Удачи с rastix.ru!** 🚀

---

*Пакет от Мастер И-Бро. 2026-07-28.*
