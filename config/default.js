module.exports = {
  frontend: {
    url: process.env.FRONTEND_URL
  },
  server: {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 3000
  },
  database: {
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST || "127.0.0.1",
    engine: process.env.DATABASE_ENGINE || "mysql",
    maxConnections: process.env.DATABASE_MAX_CONN || 25,
    minConnections: process.env.DATABASE_MIN_CONN || 0,
    maxIdleTime: process.env.DATABASE_MAX_IDLE_MS || 30000
  }
};
