"use strict";

const ProductType = use("App/Models/ProductType");
const ProductPrice = use("App/Models/ProductPrice");

class ProductPriceController {
  async index({}) {
    const ProductPrices = await ProductPrice.all();

    return ProductPrices;
  }

  async store({ request }) {
    const data = await request.only([
      "price",
      "product_id",
      "product_type_id",
      "product_size_id"
    ]);

    if (!data.product_id) {
      const productType = await ProductType.find(data.product_type_id);

      data.product_id = productType.product_id;
    }

    const productPrice = await ProductPrice.create(data);

    return productPrice;
  }

  async show({ params }) {
    const productPrice = await ProductPrice.findOrFail(params.id);

    return productPrice;
  }

  async update({ params, request }) {
    const productPrice = await ProductPrice.findOrFail(params.id);

    const data = await request.only([
      "price",
      "product_id",
      "product_type_id",
      "product_size_id"
    ]);

    productPrice.merge(data);

    await productPrice.save();

    return productPrice;
  }

  async destroy({ params }) {
    const productPrice = await ProductPrice.findOrFail(params.id);

    await productPrice.delete();
  }
}

module.exports = ProductPriceController;
