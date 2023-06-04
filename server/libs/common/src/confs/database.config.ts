import { registerAs } from '@nestjs/config';

// namespace config
export const databaseConfig = registerAs('database', () => {
  return {
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    host: process.env.MYSQL_HOST || 'localhost',
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  };
});
