"use strict";

const ProductSize = use("App/Models/ProductSize");

class ProductSizeController {
  async index({}) {
    const productSizes = await ProductSize.all();

    return productSizes;
  }

  async store({ request }) {
    const data = await request.only([
      "name",
      "short_name",
      "unity",
      "product_type_id"
    ]);

    const productSize = await ProductSize.create(data);

    return productSize;
  }

  async show({ params }) {
    const productSize = await ProductSize.findOrFail(params.id);

    return productSize;
  }

  async update({ params, request }) {
    const productSize = await ProductSize.findOrFail(params.id);

    const data = await request.only([
      "name",
      "short_name",
      "unity",
      "product_type_id"
    ]);

    productSize.merge(data);

    await productSize.save();

    return productSize;
  }

  async destroy({ params }) {
    const productSize = await ProductSize.findOrFail(params.id);

    await productSize.delete();
  }
}

module.exports = ProductSizeController;
