"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use("Factory");

Factory.blueprint("App/Models/User", faker => {
  return {
    name: "Breno França",
    email: "franciscobreno.si@gmail.com",
    username: "franciscobreno.si@gmail.com",
    kind: "administrator",
    password: "secret"
  };
});
