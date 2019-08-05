"use strict";

const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/api/account/signup", "SignUpController.store");
Route.post("/api/account/signin", "SignInController.store");

Route.get("/image/:id", "ImageController.show");

Route.group(() => {
  Route.resource("products", "ProductController").apiOnly();

  Route.resource("products.product-types", "ProductTypeController").apiOnly();

  Route.resource("product-sizes", "ProductSizeController").apiOnly();

  Route.resource("product-prices", "ProductPriceController").apiOnly();

  Route.resource("image", "ImageController").apiOnly();
})
  .prefix("/api")
  .middleware(["auth"]);
