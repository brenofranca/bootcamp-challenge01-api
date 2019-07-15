"use strict";

const Model = use("Model");

class ProductType extends Model {
  product() {
    return this.belongsTo("App/Models/Product");
  }

  sizes() {
    return this.belongsToMany("App/Models/ProductSize").pivotModel(
      "App/Models/ProductPrice"
    );
  }
}

module.exports = ProductType;
