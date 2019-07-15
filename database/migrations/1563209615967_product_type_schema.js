"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductTypeSchema extends Schema {
  up() {
    this.create("product_types", table => {
      table.increments();

      table
        .string("name", 255)
        .notNullable()
        .unique();

      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("product_types");
  }
}

module.exports = ProductTypeSchema;
