"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductImageSchema extends Schema {
  up() {
    this.create("product_image", table => {
      table.increments();

      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
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
    this.drop("product_image");
  }
}

module.exports = ProductImageSchema;
