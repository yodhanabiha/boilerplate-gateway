# Clickmark Gateway Boilerplate

A robust, feature-rich, and highly scalable Node.js backend boilerplate designed to jumpstart the development of API gateways and microservices. Built with TypeScript and Express, this boilerplate comes pre-configured with essential enterprise-grade features and integrations.

## 🚀 Technologies & Libraries

This boilerplate leverages a modern and powerful technology stack:

### Core
* **[Node.js](https://nodejs.org/) & [TypeScript](https://www.typescriptlang.org/)**: Powerful JavaScript runtime with static typing for better maintainability.
* **[Express](https://expressjs.com/)**: Fast, unopinionated, minimalist web framework for Node.js.

### Database & ORM
* **[PostgreSQL](https://www.postgresql.org/)**: Advanced open-source relational database.
* **[Sequelize](https://sequelize.org/) & [Sequelize-Typescript](https://www.npmjs.com/package/sequelize-typescript)**: Promise-based Node.js ORM with robust TypeScript support.

### Caching & Messaging
* **[Redis](https://redis.io/)**: In-memory data structure store, used as a database, cache, and message broker.
* **[RabbitMQ / amqplib](https://www.rabbitmq.com/)**: Message-broker software for handling background jobs and microservices communication.

### Real-time & Media
* **[Socket.io](https://socket.io/)**: Bidirectional and low-latency communication for every platform.
* **[Mediasoup](https://mediasoup.org/)**: Cutting Edge WebRTC Video Conferencing.

### Storage & Files
* **[MinIO](https://min.io/)**: High Performance Object Storage compatible with Amazon S3 API.
* **[Multer](https://github.com/expressjs/multer)**: Middleware for handling `multipart/form-data` (file uploads).
* **[Sharp](https://sharp.pixelplumbing.com/)**: High-performance Node.js image processing.

### Security & Authentication
* **[JWT (jsonwebtoken)](https://jwt.io/)**: For secure transmission of information between parties as a JSON object.
* **[Bcrypt.js](https://www.npmjs.com/package/bcryptjs)**: Library to help you hash passwords.

### Monitoring & Logging
* **[Winston](https://github.com/winstonjs/winston) & [Winston-Loki](https://github.com/JaniAnttonen/winston-loki)**: Versatile logging library configured to send logs to Grafana Loki.
* **[OpenTelemetry](https://opentelemetry.io/)**: High-quality, ubiquitous, and portable telemetry to enable effective observability.

### Utilities & Third-Party
* **[Firebase Admin](https://firebase.google.com/docs/admin/setup)**: For push notifications and Firebase services integration.
* **[Nodemailer](https://nodemailer.com/)**: Easy as cake email sending from Node.js.
* **[ExcelJS](https://github.com/exceljs/exceljs) / [xlsx](https://sheetjs.com/)**: For reading, manipulating and writing spreadsheet data and styles to XLSX and JSON.
* **[html-pdf](https://www.npmjs.com/package/html-pdf) / [pdf-creator-node](https://www.npmjs.com/package/pdf-creator-node)**: Document and PDF generation.
* **[Lodash](https://lodash.com/) & [Moment](https://momentjs.com/)**: Essential utility libraries for arrays, numbers, objects, strings, and dates.
* **[QRCode](https://www.npmjs.com/package/qrcode)**: 2D barcode generator.

---

## 📦 Features Included

### 1. Ready-to-use Master APIs
Pre-built CRUD operations and models for essential entities:
* **Credentials**: User authentication, User Management, and User Assignments.
* **Master Data**: Roles, Menus, Company, Employee, Codebook, and Codebook Details.

### 2. Standardized Architecture
* **Base Controller & Base Response**: Standardized request handling and uniform API JSON response structure.
* **Middleware Integration**: Pre-configured middleware for validation, authentication, and error handling.

### 3. Comprehensive Configurations
Located in `src/main/config/`, pre-configured connections for:
* `DBConfig` (PostgreSQL)
* `RedisConfig` (Caching)
* `BrokerConfig` (RabbitMQ)
* `MinioConfig` (Object Storage)
* `EmailConfig` (Nodemailer)
* `Firebase` (Push Notifications)
* `LoggingConfig` (Winston & Loki)
* `MediaSoupConfig` & `RoomsConfig` (WebRTC)

### 4. Extensive Utility Classes
A rich collection of helper functions in `src/main/utility/` to speed up development:
* `APIUtility`, `ArrayUtility`, `DateUtility`, `StringUtility`, `ObjectUtility`
* `FirebaseUtility`, `UploadUtility`, `MediaSoupUtility`, `RedisUtility`, `SocketUtility`
* `SessionUtility`, `ValidationUtility`, `RupiahUtility`

### 5. Event-Driven Ready
Pre-configured consumer (`consumer.ts`) and event directory (`src/main/event/`) to easily implement an event-driven architecture using RabbitMQ.

### 6. Developer Experience
* **Hot Reloading**: Fast local development with `nodemon` and `ts-node`.
* **Linting & Formatting**: Enforced code styles with `eslint`, `prettier`, and `husky` pre-commit hooks.
* **Sequelize CLI**: Easy database migration and seeding commands.

---

## 🛠️ Getting Started

### Prerequisites
Make sure you have the following installed:
* Node.js (v18+)
* PostgreSQL
* Redis
* RabbitMQ
* MinIO

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env` (if exists) and update the configuration matching your local setup.

3. Run Database Migrations:
   ```bash
   npm run migrate
   ```

4. Start Development Server:
   ```bash
   npm run dev
   ```

### Scripts

* `npm run dev`: Start the application in development mode with hot-reloading.
* `npm run build`: Build the TypeScript code into JavaScript in the `dist` folder.
* `npm start`: Start the compiled application.
* `npm run lint` / `npm run prettier:fix`: Check and fix code formatting issues.
