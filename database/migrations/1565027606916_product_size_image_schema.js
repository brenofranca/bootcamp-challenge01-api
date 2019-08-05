"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductSizeImageSchema extends Schema {
  up() {
    this.create("product_size_image", table => {
      table.increments();

      table
        .integer("product_size_id")
        .unsigned()
        .references("id")
        .inTable("product_sizes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table
        .integer("image_id")
        .unsigned()
        .references("id")
        .inTable("images")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("product_size_image");
  }
}

module.exports = ProductSizeImageSchema;
