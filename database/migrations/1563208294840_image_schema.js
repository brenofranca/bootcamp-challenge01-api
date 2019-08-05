"use strict";

const Schema = use("Schema");

class ImageSchema extends Schema {
  up() {
    this.create("images", table => {
      table.increments();
      table.string("hash").notNullable();
      table.string("name").notNullable();
      table.string("type", 20);
      table.string("subtype", 20);
      table.timestamps();
    });
  }

  down() {
    this.drop("images");
  }
}

module.exports = ImageSchema;
