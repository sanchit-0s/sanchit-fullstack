/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();   
      table.string('email').unique().notNullable();  
      table.string('name').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users'); // Drop the `users` table if it exists
  };
  
