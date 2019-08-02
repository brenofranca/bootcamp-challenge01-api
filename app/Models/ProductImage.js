"use strict";

const Env = use("Env");
const Model = use("Model");

class ProductImage extends Model {
  static boot() {
    super.boot();
  }

  static get computed() {
    return ["url"];
  }

  getUrl({ id, product_id }) {
    return `${Env.get("APP_URL")}/products/${product_id}/image/${id}`;
  }

  product() {
    return this.belongsTo("App/Models/Product");
  }
}

module.exports = ProductImage;
