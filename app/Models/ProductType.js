"use strict";

const Model = use("Model");

class ProductType extends Model {
  product() {
    return this.belongsTo("App/Models/Product");
  }

  sizes() {
    return this.hasMany("App/Models/ProductSize");
  }
}

module.exports = ProductType;
