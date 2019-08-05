"use strict";

const Schema = use("Schema");

class ProductSchema extends Schema {
  up() {
    this.create("products", table => {
      table.increments();

      table
        .string("name", 255)
        .notNullable()
        .unique();

      table.string("description", 255);

      table.string("time", 10);

      table.timestamps();
    });
  }

  down() {
    this.drop("products");
  }
}

module.exports = ProductSchema;
