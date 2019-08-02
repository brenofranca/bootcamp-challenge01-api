"use strict";

const Model = use("Model");

class Product extends Model {
  static boot() {
    super.boot();
  }

  productType() {
    return this.hasMany("App/Models/ProductType");
  }

  file() {
    return this.hasOne("App/Models/ProductImage");
  }
}

module.exports = Product;
