module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "prueba_sequelize",
    "host": "localhost",
    "dialect": "mysql",
    "paranoid": false,
    "timestamps": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
