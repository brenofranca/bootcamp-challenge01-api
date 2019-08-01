"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlterProductsSchema extends Schema {
  up() {
    this.alter("products", table => {
      table.string("time", 10);
      table.string("image", 255);
    });
  }

  down() {
    this.table("alter_products", table => {
      table.dropColumn("time");
      table.dropColumn("image");
    });
  }
}

module.exports = AlterProductsSchema;
