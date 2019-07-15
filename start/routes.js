"use strict";

const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/api/account/signup", "SignUpController.store");
Route.post("/api/account/signin", "SignInController.store");

Route.resource("/api/products", "ProductController")
  .apiOnly()
  .middleware("auth");

Route.resource("/api/product-types", "ProductTypeController")
  .apiOnly()
  .middleware("auth");

Route.resource("/api/product-sizes", "ProductSizeController")
  .apiOnly()
  .middleware("auth");

Route.resource("/api/product-prices", "ProductPriceController")
  .apiOnly()
  .middleware("auth");
