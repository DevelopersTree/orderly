exports.seed = (knex) => knex('option').del()
  .then(() => knex('option').insert([
    { name: 'monitor_folders', value: 0 },
  ]));
