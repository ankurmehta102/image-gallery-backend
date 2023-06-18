export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    access_exp_time: process.env.JWT_ACCESS_EXP_TIME,
    secret: process.env.JWT_SECRET,
  },
});
