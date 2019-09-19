module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ssl: process.env.NODE_ENV === 'prod',
  migrationsTableName: 'typeorm_migrations',
  migrations: [
    __dirname + '/migrations/**/*{.ts,.js}'
  ],
  entities: [
    'src/modules/**/*.entity.ts',
  ],
  cli: {
    migrationsDir: 'migrations'
  },
  synchronize: false,
}
