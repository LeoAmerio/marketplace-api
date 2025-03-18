import { registerAs } from '@nestjs/config';

export const CONFIG_KEY = 'config';

export default registerAs(CONFIG_KEY, () => {
  return {
    database: {
      name: process.env.POSTGRES_DATABASE,
      port: process.env.DATABASE_PORT,
      // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
    apiKey: process.env.API_KEY,
  };
});
