"use strict";

const Model = use("Model");

class PaymentOrder extends Model {
  products() {
    return this.hasMany("App/Models/PaymentOrderProduct");
  }
}

module.exports = PaymentOrder;
