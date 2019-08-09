"use strict";

const Model = use("Model");

class ProductPrice extends Model {
  static boot() {
    super.boot();

    this.addHook("afterFetch", async items => {
      for (let item of items) {
        const price_currency = (item.price / 100)
          .toFixed(2)
          .replace(".", ",")
          .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");

        item.price_presentation = `R$ ${price_currency}`;
      }
    });
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
