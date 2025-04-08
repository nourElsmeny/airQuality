interface db {
  host: string;
  data: string;
  port: number;
  dialect: any;
  user: string;
  password: string;
  database: string;
}

export default interface config {
  env: string;
  port: number;
  redisEX: number;
  redisURL: string;
  redisPassword: string;
  db: db;
  apiKey: string;
  airVisual: string;
}
