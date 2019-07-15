"use strict";

const User = use("App/Models/User");

class SignUpController {
  async store({ request, response }) {
    const data = await request.only(["name", "username", "email", "password"]);

    if (data.password !== request.input("password_confirmation")) {
      return response
        .status(400)
        .json({ message: "As senhas informadas não correspondem." });
    }

    const user = await User.create(data);

    return user;
  }
}

module.exports = SignUpController;
