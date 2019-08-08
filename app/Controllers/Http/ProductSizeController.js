"use strict";

const ProductSize = use("App/Models/ProductSize");

class ProductSizeController {
  async index({}) {
    const productSizes = await ProductSize.query()
      .with("images")
      .fetch();

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

    await this.associateImages({ request, productSize });

    return productSize;
  }

  async show({ params }) {
    const productSize = await ProductSize.findOrFail(params.id);

    await productSize.load("images");

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

    await this.associateImages({ request, productSize });

    await productSize.load("images");

    return productSize;
  }

  async destroy({ params }) {
    const productSize = await ProductSize.findOrFail(params.id);

    await productSize.delete();
  }

  async associateImages({ request, productSize }) {
    const imagesIds = await request.input("images");

    if (imagesIds) {
      await productSize.images().attach(imagesIds);
    }
  }
}

module.exports = ProductSizeController;
