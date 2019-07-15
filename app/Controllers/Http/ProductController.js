"use strict";

const Product = use("App/Models/Product");

class ProductController {
  async index({}) {
    const products = await Product.all();

    return products;
  }

  async store({ request }) {
    const data = await request.only(["name", "description"]);

    const product = await Product.create(data);

    return product;
  }

  async show({ params }) {
    const product = await Product.findOrFail(params.id);

    return product;
  }

  async update({ params, request, response }) {
    const product = await Product.findOrFail(params.id);

    const data = await request.only(["name", "description"]);

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
