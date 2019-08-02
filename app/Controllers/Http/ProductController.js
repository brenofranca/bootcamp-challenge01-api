"use strict";

const Product = use("App/Models/Product");

class ProductController {
  async index({}) {
    const products = await Product.query()
      .with("file")
      .fetch();

    return products;
  }

  async store({ request }) {
    const data = await request.only(["name", "time", "image", "description"]);

    const product = await Product.create(data);

    return product;
  }

  async show({ params }) {
    const product = await Product.find(params.id);

    await product.load("file");

    return product;
  }

  async update({ params, request, response }) {
    const product = await Product.findOrFail(params.id);

    const data = await request.only(["name", "time", "image", "description"]);

    product.merge(data);

    await product.save();

    return product;
  }

  async destroy({ params }) {
    const product = await Product.findOrFail(params.id);

    await product.delete();
  }
}

module.exports = ProductController;
