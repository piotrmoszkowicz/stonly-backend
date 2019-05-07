module.exports = {
  frontend: {
    url: "http://localhost:8080"
  },
  server: {
    host: "localhost",
    port: 3000
  },
  database: {
    name: "",
    user: "",
    password: "",
    port: 3306,
    host: "127.0.0.1",
    engine: "mysql",
    maxConnections: 25,
    minConnections: 0,
    maxIdleTime: 30000
  }
};
