
exports.up = (knex) => knex.schema.createTable('folder_extention', (table) => {
  table.increments('id').primary();
  table.integer('folder_id').notNullable();
  table.integer('extention_id').notNullable();
  table.charset('utf8');
  table.collate('utf8_general_ci');
});

exports.down = (knex) => knex.schema.dropTable('folder_extention');
