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

  images() {
    return this.belongsToMany("App/Models/Image")
      .pivotTable("product_type_image")
      .withTimestamps();
  }
}

module.exports = ProductType;
