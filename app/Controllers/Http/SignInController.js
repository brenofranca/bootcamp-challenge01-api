"use strict";

const User = use("App/Models/User");

class SignInController {
  async store({ auth, request }) {
    const { username, password } = await request.all();

    const user = await User.findBy({ email: username });

    const credentials = await auth.attempt(username, password);

    return {
      user,
      credentials
    };
  }
}

module.exports = SignInController;
