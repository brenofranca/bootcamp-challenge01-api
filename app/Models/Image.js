"use strict";

const Env = use("Env");
const Model = use("Model");

class Image extends Model {
  static boot() {
    super.boot();
  }

  static get computed() {
    return ["url"];
  }

  getUrl({ id }) {
    return `${Env.get("APP_URL")}/image/${id}`;
  }
}

module.exports = Image;
