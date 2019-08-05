"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductTypeImageSchema extends Schema {
  up() {
    this.create("product_type_image", table => {
      table.increments();

      table
        .integer("product_type_id")
        .unsigned()
        .references("id")
        .inTable("product_types")
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
    this.drop("product_type_image");
  }
}

module.exports = ProductTypeImageSchema;
