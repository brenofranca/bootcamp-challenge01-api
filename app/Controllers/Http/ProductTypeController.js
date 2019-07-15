"use strict";

const ProductType = use("App/Models/ProductType");

class ProductTypeController {
  async index({}) {
    const productTypes = await ProductType.all();

    return productTypes;
  }

  async store({ request }) {
    const data = await request.only(["name"]);

    const productType = await ProductType.create(data);

    return productType;
  }

  async show({ params }) {
    const productType = await ProductType.findOrFail(params.id);

    return productType;
  }

  async update({ params, request, response }) {
    const productType = await ProductType.findOrFail(params.id);

    const data = await request.only(["name"]);

    productType.merge(data);

    await productType.save();

    return productType;
  }

  async destroy({ params }) {
    const productType = await ProductType.findOrFail(params.id);

    await productType.delete();
  }
}

module.exports = ProductTypeController;
