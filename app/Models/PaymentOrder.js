"use strict";

const Model = use("Model");

class PaymentOrder extends Model {
  static boot() {
    super.boot();

    this.addHook("afterFetch", async items => {
      for (let item of items) {
        item.price = (item.price / 100)
          .toFixed(2)
          .replace(".", ",")
          .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
      }
    });
  }
  products() {
    return this.hasMany("App/Models/PaymentOrderProduct");
  }
}

module.exports = PaymentOrder;
