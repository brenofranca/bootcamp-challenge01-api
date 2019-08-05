"use strict";

const ProductType = use("App/Models/ProductType");

class ProductTypeController {
  async index({ params }) {
    const productTypes = await ProductType.query()
      .where("product_id", params.products_id)
      .with("images")
      .fetch();

    return productTypes;
  }

  async store({ request }) {
    const data = await request.only(["name", "product_id"]);

    const productType = await ProductType.create(data);

    await this.associateImages({ request, productType });

    return productType;
  }

  async show({ params }) {
    const productType = await ProductType.findOrFail(params.id);

    await productType.load("images");

    return productType;
  }

  async update({ params, request }) {
    const productType = await ProductType.findOrFail(params.id);

    const data = await request.only(["name", "product_id"]);

    productType.merge(data);

    await productType.save();

    await this.associateImages({ request, productType });

    return productType;
  }

  async destroy({ params }) {
    const productType = await ProductType.findOrFail(params.id);

    await productType.delete();
  }

  async associateImages({ request, productType }) {
    const imagesIds = await request.input("images");

    if (imagesIds) {
      await productType.images().attach(imagesIds);
    }
  }
}

module.exports = ProductTypeController;
