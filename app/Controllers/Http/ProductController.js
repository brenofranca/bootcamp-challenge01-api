"use strict";

const Image = use("App/Models/Image");
const Product = use("App/Models/Product");

class ProductController {
  async index({}) {
    const products = await Product.query()
      .with("images")
      .fetch();

    return products;
  }

  async store({ request }) {
    const data = await request.only(["name", "time", "description"]);

    const product = await Product.create(data);

    await this.associateImages({ request, product });

    return product;
  }

  async show({ params }) {
    const product = await Product.find(params.id);

    await product.load("images");

    return product;
  }

  async update({ params, request }) {
    const product = await Product.findOrFail(params.id);

    const data = await request.only(["name", "time", "description"]);

    product.merge(data);

    await product.save();

    await this.associateImages({ request, product });

    return product;
  }

  async destroy({ params }) {
    const product = await Product.findOrFail(params.id);

    await product.delete();
  }

  async associateImages({ request, product }) {
    const imagesIds = await request.input("images");

    if (imagesIds) {
      await product.images().attach(imagesIds);
    }
  }
}

module.exports = ProductController;
