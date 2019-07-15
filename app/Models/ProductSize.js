"use strict";

const Model = use("Model");

class ProductSize extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async productSizeInstance => {
      if (productSizeInstance.dirty.unity) {
        productSizeInstance.unity = productSizeInstance.unity.toUpperCase();
      }
      if (!productSizeInstance.short_name) {
        productSizeInstance.short_name = productSizeInstance.name;
      }
    });
  }

  types() {
    return this.belongsToMany("App/Models/ProductType").pivotModel(
      "App/Models/ProductPrice"
    );
  }
}

module.exports = ProductSize;
