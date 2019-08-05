"use strict";

const Helpers = use("Helpers");
const Image = use("App/Models/Image");

class ImageController {
  async store({ request, response }) {
    try {
      const upload = request.file("file", { size: "2mb" });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath("uploads"), { name: fileName });

      if (!upload.moved()) {
        throw upload.error();
      }

      const image = await Image.create({
        hash: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      });

      return image;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: err }
      });
    }
  }

  async show({ params, response }) {
    const file = await Image.findOrFail(params.id);

    return response.download(Helpers.tmpPath(`uploads/${file.hash}`));
  }

  async update({ params, request }) {
    const upload = request.file("file", { size: "2mb" });

    const image = await Image.findOrFail(params.id);

    await this.removePersistedFile(image);

    const fileName = `${Date.now()}.${upload.subtype}`;

    await upload.move(Helpers.tmpPath("uploads"), { name: fileName });

    Image.merge({
      hash: fileName,
      name: upload.clientName,
      type: upload.type,
      subtype: upload.subtype
    });

    await Image.save();

    return image;
  }

  async destroy({ params, request, response }) {
    const image = await Image.findOrFail(params.id);

    await this.removePersistedFile(image);

    await Image.delete();
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

module.exports = ImageController;
