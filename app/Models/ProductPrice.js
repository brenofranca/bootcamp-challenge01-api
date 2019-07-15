"use strict";

const Model = use("Model");

class ProductPrice extends Model {
  static boot() {
    super.boot();
  }

  productType() {
    return this.belongsTo("App/Models/ProductType");
  }
  productSize() {
    return this.belongsTo("App/Models/ProductSize");
  }
}

module.exports = ProductPrice;
