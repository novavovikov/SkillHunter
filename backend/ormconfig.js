module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ssl: true,
  migrationsTableName: 'typeorm_migrations',
  migrations: [
    'src/migrations/*.ts'
  ],
  entities: [
    'src/modules/**/*.entity.ts',
  ],
  cli: {
    migrationsDir: 'src/migrations'
  },
  synchronize: false,
};
