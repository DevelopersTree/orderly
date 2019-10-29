const path = require('path');

const dbPath = path.join(__dirname, '../../data/', 'storage.sqlite');
const storage = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

module.exports = storage;
