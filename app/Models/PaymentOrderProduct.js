"use strict";

const Model = use("Model");
const Product = use("App/Models/Product");
const ProductSize = use("App/Models/ProductSize");
const ProductType = use("App/Models/ProductType");
const ProductPrice = use("App/Models/ProductPrice");

class PaymentOrderProduct extends Model {
  static boot() {
    super.boot();

    this.addHook("afterFetch", async items => {
      for (let item of items) {
        item.product = await Product.find(item.product_type_id);
        item.productType = await ProductType.find(item.product_type_id);
        item.productSize = await ProductSize.find(item.product_size_id);
        item.productPrice = await ProductPrice.find(item.product_price_id);
      }
    });
  }
}

module.exports = PaymentOrderProduct;
