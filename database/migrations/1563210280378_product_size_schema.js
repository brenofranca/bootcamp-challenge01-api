"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductSizeSchema extends Schema {
  up() {
    this.create("product_sizes", table => {
      table.increments();

      table
        .string("name", 255)
        .notNullable()
        .unique();

      table.string("short_name", 255);

      table.string("unity", 20).defaultTo("cm");

      table.timestamps();
    });
  }

  down() {
    this.drop("product_sizes");
  }
}

module.exports = ProductSizeSchema;
