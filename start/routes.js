"use strict";

const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/api/account/signup", "SignUpController.store");
Route.post("/api/account/signin", "SignInController.store");

Route.get("/products/:products_id/image/:id", "ProductImageController.show");

Route.group(() => {
  Route.resource("products", "ProductController").apiOnly();

  Route.resource("product-types", "ProductTypeController").apiOnly();

  Route.resource("product-sizes", "ProductSizeController").apiOnly();

  Route.resource("product-prices", "ProductPriceController").apiOnly();

  Route.resource("products.image", "ProductImageController").apiOnly();
})
  .prefix("/api")
  .middleware(["auth"]);
