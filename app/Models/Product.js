"use strict";

const Model = use("Model");

class Product extends Model {
  productType() {
    return this.hasMany("App/Models/ProductType");
  }
}

module.exports = Product;
