const keys = require('./keys');

module.exports = {
  development: {
    username: keys.mysqlUser,
    password: keys.mysqlPassword,
    database: keys.mysqlDatabase,
    host: keys.mysqlHost,
    port: keys.mysqlPort,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'JAWSDB_URL',
    dialect: 'mysql',
  },
};
