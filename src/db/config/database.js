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
    "password": "nlMiLFyiK0LnP9QialSI",
    "database": "railway",
    "host": "containers-us-west-76.railway.app",
    "dialect": "mysql",
    "port": 6156,
    "operatorsAliases": false
  }
}
