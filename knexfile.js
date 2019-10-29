// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './storage.sqlite',
    },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './storage.sqlite',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
