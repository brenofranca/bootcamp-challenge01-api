"use strict";

const Schema = use("Schema");

class PaymentOrderProductSchema extends Schema {
  up() {
    this.create("payment_order_products", table => {
      table.increments();

      table.string("price");
      table.string("quantity");
      table.string("total");
      table.string("name");
      table.string("description");

      table
        .integer("payment_order_id")
        .unsigned()
        .references("id")
        .inTable("payment_orders")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table
        .integer("product_type_id")
        .unsigned()
        .references("id")
        .inTable("product_types")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table
        .integer("product_price_id")
        .unsigned()
        .references("id")
        .inTable("product_prices")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table
        .integer("product_size_id")
        .unsigned()
        .references("id")
        .inTable("product_sizes")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.timestamps();
    });
  }

  down() {
    this.drop("payment_order_products");
  }
}

module.exports = PaymentOrderProductSchema;
