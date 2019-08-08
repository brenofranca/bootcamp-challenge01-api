"use strict";

const Model = use("Model");

class ProductPrice extends Model {
  static boot() {
    super.boot();
  }

  product() {
    return this.belongsTo("App/Models/Product");
  }
  productSize() {
    return this.belongsTo("App/Models/ProductSize");
  }
  productType() {
    return this.belongsTo("App/Models/ProductType");
  }
}

module.exports = ProductPrice;
