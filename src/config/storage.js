const storage = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../../data/storage.sqlite',
  },
  useNullAsDefault: true,
});

module.exports = storage;
