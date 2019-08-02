"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlterProductsSchema extends Schema {
  up() {
    this.alter("products", table => {
      table.string("time", 10);
    });
  }

  down() {
    this.table("products", table => {
      table.dropColumn("time");
    });
  }
}

module.exports = AlterProductsSchema;
