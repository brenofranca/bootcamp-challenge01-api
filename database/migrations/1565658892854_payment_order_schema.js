"use strict";

const Schema = use("Schema");

class PaymentOrderSchema extends Schema {
  up() {
    this.create("payment_orders", table => {
      table.increments();

      table.string("price").notNullable();

      table.string("observation", 255).notNullable();
      table.string("cep", 255).notNullable();
      table.string("address", 255).notNullable();
      table.string("number", 255).notNullable();
      table.string("district", 255).notNullable();
      table.string("state", 255).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("payment_orders");
  }
}

module.exports = PaymentOrderSchema;
