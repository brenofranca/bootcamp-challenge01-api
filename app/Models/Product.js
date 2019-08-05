"use strict";

const Model = use("Model");

class Product extends Model {
  static boot() {
    super.boot();
  }

  productType() {
    return this.hasMany("App/Models/ProductType");
  }

  images() {
    return this.belongsToMany("App/Models/Image")
      .pivotTable("product_image")
      .withTimestamps();
  }
}

module.exports = Product;
