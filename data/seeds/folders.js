exports.seed = (knex) => knex('folder').del()
  .then(() => knex('folder').insert([
    { id: 1, name: 'Pictures' },
    { id: 2, name: 'Audio' },
    { id: 3, name: 'Videos' },
    { id: 4, name: 'Documents' },
    { id: 5, name: 'Archives' },
    { id: 6, name: 'Ebooks' },
    { id: 7, name: 'Torrents' },
    { id: 8, name: 'Executables' },
    { id: 9, name: 'Databases' },
    { id: 10, name: 'Mobile Related' },
    { id: 11, name: 'CAD' },
    { id: 12, name: 'Fonts' },
    { id: 13, name: 'Web Related' },
    { id: 14, name: 'Photoshop' },
    { id: 15, name: 'Text Files' },
  ]));
