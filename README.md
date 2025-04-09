# 🌍 Air Quality API Service

This project provides APIs to retrieve air quality data, including:
- The nearest city based on coordinates
- The most polluted date and time in Paris zone.
---

## 🚀 Features

- 🌐 Fetch real-time air quality data from external APIs
- 🗃️ Retrieve the highest recorded pollution levels in Paris from your DB
- 🔒 Environment variable support using `.env`
- ✅ Unit tested with Jest
- ✅ Swagger Documentation http://localhost:3000/api-docs

---

## 🛠️ Technologies

- TypeScript
- Node.js
- Redis
- Sequelize (PostgreSQL)
- Jest (for unit testing)
- dotenv (for environment config)
  
---

## 📦 Setup ENV 

- Create a new DB with the name air-quality.
- Update DB_Host with your DB Host.
- Update DB_USER with your DB User.
- Update DB_PASSWORD with your DB Password.
- Update API_KEY with your Air quality API Key.
- Update REDISURL and REDISPASSWORD with your Redis URL and Password to connect.
  
---

## 📦 Installation

```bash
git clone https://github.com/nourElsmeny/airQuality.git
cd airQuality
npm install
npm run start:dev
```
---
## 📦 Testing
```bash
npm run start:test
```
