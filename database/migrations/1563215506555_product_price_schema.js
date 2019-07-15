"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductPriceSchema extends Schema {
  up() {
    this.create("product_prices", table => {
      table.increments();

      table.float("price").notNullable();

      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table
        .integer("product_type_id")
        .unsigned()
        .references("id")
        .inTable("product_types")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table
        .integer("product_size_id")
        .unsigned()
        .references("id")
        .inTable("product_sizes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("product_prices");
  }
}

module.exports = ProductPriceSchema;
