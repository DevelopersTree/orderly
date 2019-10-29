exports.seed = (knex) => knex('folder').del()
  .then(() => knex('folder').insert([
    { name: 'Pictures' },
    { name: 'Audio' },
    { name: 'Videos' },
    { name: 'Documents' },
    { name: 'Archives' },
    { name: 'Torrents' },
    { name: 'Executables' },
    { name: 'Databases' },
  ]));
