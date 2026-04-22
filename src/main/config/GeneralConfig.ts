import { initBroker } from "./BrokerConfig";
import DB from "./DBConfig";
import dotenv from "dotenv";
dotenv.config();

const data = {
  NODE_ENV: process.env.NODE_ENV,
  SERVER_PORT: process.env.SERVER_PORT,
  SERVICE_NAME: process.env.SERVICE_NAME!,
  IS_TRACING: Boolean(process.env.TRACING),
  SOCKET_PORT: process.env.SOCKET_PORT,
  SOCKET_PATH: process.env.SOCKET_PATH,
  SOCKET_ALLOW_CROS: process.env.SOCKET_ALLOW_CROS,
  STORAGE_DIR: process.env.STORAGE_DIR,
  SUPER_USERNAME: process.env.SUPER_USERNAME,
  SUPER_EMAIL: process.env.SUPER_EMAIL,
  SUPER_PASSWORD: process.env.SUPER_PASSWORD,
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
  MINIO_PORT: process.env.MINIO_PORT,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
  MINIO_USE_SSL: Boolean(process.env.MINIO_USE_SSL),
  BASE_URL: process.env.BASE_URL,
  REFRESH_TOKEN: Boolean(process.env.REFRESH_TOKEN),
  TOKEN_USER: parseInt(process.env.TOKEN_USER ?? '10'),
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION!,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION!,
  NUMBER_OF_ALLOWED_SESSIONS: parseInt(
    process.env.NUMBER_OF_ALLOWED_SESSIONS ?? '1',
  ),
  ENCRYPTION_SALT: parseInt(process.env.ENCRYPTION_SALT!),
  API_TOKEN: process.env.API_TOKEN,
  MAIL_HOST: process.env.MAIL_HOST!,
  MAIL_PORT: parseInt(
    process.env.MAIL_PORT ?? '1',
  ),
  MAIL_SENDER: process.env.MAIL_SENDER!,
  MAIL_USER: process.env.MAIL_USER!,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD!,
  MAIL_SECURE: process.env.MAIL_SECURE!,
  MAIL_REQUIRE_TLS: process.env.MAIL_REQUIRE_TLS!,
  MAIL_TLS_MIN_VERSION: process.env.MAIL_TLS_MIN_VERSION ?? 'TLSv1.2',
  MAIL_TEMPLATE_DIR: process.env.MAIL_TEMPLATE_DIR,
  MAIL_REPLY_TO: process.env.MAIL_REPLY_TO,
  // MAIL_TLS_REJECT_UNAUTHORIZED: process.env.MAIL_TLS_REJECT_UNAUTHORIZED!,
  URL_VERIFY_ACCOUNT: process.env.URL_VERIFY_ACCOUNT!,
  URL_FORGOT_PASSWORD: process.env.URL_FORGOT_PASSWORD!,
  APP_NAME: process.env.APP_NAME!,
  WEB_URL: process.env.WEB_URL!,
  ENTITY_EMAIL_NAME: process.env.ENTITY_EMAIL_NAME!,
  BASE_URL_FL: process.env.BASE_URL_FL ?? '/',
  FL_API_KEY: process.env.FL_API_KEY ?? '/'
};

export async function initializeConnection() {
  DB.forEach(async (value) => {
    await value.instance.authenticate()
    if (value.afterConnect)
      value.afterConnect(value.instance)
  })
  initBroker();
}

export default {
  ...data
}

export interface HospitalInfo {
  hospitalId: string;
  code: string;
  name: string;
  description: string;
}

export interface ItemRacikInfo {
  sourceId: string;
  code: string;
  name: string;
  quantity: number;
  unit: number;
  cost: number;
  totalCost: number;
}