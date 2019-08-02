"use strict";

const Helpers = use("Helpers");
const Product = use("App/Models/Product");
const ProductImage = use("App/Models/ProductImage");

class ProductImageController {
  async store({ request, params, response }) {
    try {
      const productImagehasCreated = await ProductImage.findBy(
        "product_id",
        params.products_id
      );

      if (productImagehasCreated) {
        return response.status(400).send({
          error: {
            message: "Já existem uma imagem cadastrada para esse produto!"
          },
          docs: {
            file: productImagehasCreated
          }
        });
      }

      const upload = request.file("file", { size: "2mb" });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath("uploads"), { name: fileName });

      if (!upload.moved()) {
        throw upload.error();
      }

      const productImage = await ProductImage.create({
        hash: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        product_id: params.products_id
      });

      return productImage;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: err }
      });
    }
  }

  async show({ params, response }) {
    const file = await ProductImage.findOrFail(params.id);

    return response.download(Helpers.tmpPath(`uploads/${file.hash}`));
  }

  async update({ params, request }) {
    const upload = request.file("file", { size: "2mb" });

    const productImage = await ProductImage.findOrFail(params.id);

    await this.removePersistedFile(productImage);

    const fileName = `${Date.now()}.${upload.subtype}`;

    await upload.move(Helpers.tmpPath("uploads"), { name: fileName });

    productImage.merge({
      hash: fileName,
      name: upload.clientName,
      type: upload.type,
      subtype: upload.subtype,
      product_id: params.products_id
    });

    await productImage.save();

    return productImage;
  }

  async destroy({ params, request, response }) {
    const productImage = await ProductImage.findOrFail(params.id);

    await this.removePersistedFile(productImage);

    await productImage.delete();
  }

  async removePersistedFile(file) {
    try {
      const fs = Helpers.promisify(require("fs"));

      return await fs.unlink(Helpers.tmpPath(`uploads/${file.hash}`));
    } catch (error) {
      return false;
    }
  }
}

module.exports = ProductImageController;
