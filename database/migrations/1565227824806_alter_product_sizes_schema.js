"use strict";

const Schema = use("Schema");

class AlterProductSizesSchema extends Schema {
  up() {
    this.alter("product_sizes", table => {
      table
        .integer("product_type_id")
        .unsigned()
        .references("id")
        .inTable("product_types")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.raw("SET sql_mode='TRADITIONAL'").alter("product_sizes", table => {
      table.dropForeign("product_id");
      table.dropColumn("product_id");
    });
  }
}

module.exports = AlterProductSizesSchema;
