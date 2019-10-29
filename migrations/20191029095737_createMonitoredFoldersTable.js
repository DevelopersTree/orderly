
exports.up = (knex) => knex.schema.createTable('monitored_folder', (table) => {
  table.increments('id').primary();
  table.string('name', 255).notNullable();
  table.string('full_path', 1500).notNullable();
  table.charset('utf8');
  table.collate('utf8_general_ci');
});

exports.down = (knex) => knex.schema.dropTable('monitored_folder');
