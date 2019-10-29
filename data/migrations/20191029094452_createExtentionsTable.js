
exports.up = (knex) => knex.schema.createTable('extention', (table) => {
  table.increments('id').primary();
  table.string('name', 255).notNullable();
  table.string('ext', 200).notNullable();
  table.enu('operation', ['move', 'copy', 'delete', 'none']);
  table.charset('utf8');
  table.collate('utf8_general_ci');
});

exports.down = (knex) => knex.schema.dropTable('extention');
