
exports.up = (knex) => knex.schema.createTable('folder', (table) => {
  table.increments('id').primary();
  table.string('name', 255).notNullable();
  table.charset('utf8');
  table.collate('utf8_general_ci');
});

exports.down = (knex) => knex.schema.dropTable('folder');
