"use strict";

const PaymentOrder = use("App/Models/PaymentOrder");
const PaymentOrderProduct = use("App/Models/PaymentOrderProduct");

class PaymentOrderController {
  async index({}) {
    const orders = await PaymentOrder.query()
      .with("products")
      .fetch();

    return orders;
  }

  async store({ request }) {
    const orderData = await request.only([
      "observation",
      "cep",
      "address",
      "number",
      "district",
      "state"
    ]);

    orderData.price = request.input("total");

    const paymentOrder = await PaymentOrder.create(orderData);

    await this.associateProducts({ request, paymentOrder });

    return paymentOrder;
  }

  async show({ params }) {
    const orders = await PaymentOrder.query()
      .with("products")
      .where("id", params.id)
      .fetch();

    return orders;
  }

  async update({ params, request, response }) {}

  async destroy({ params }) {
    await PaymentOrderProduct.query()
      .where("payment_order_id", params.id)
      .delete();

    const order = await PaymentOrder.find(params.id);

    await order.delete();
  }

  async associateProducts({ request, paymentOrder }) {
    const products = await request.input("products");

    products.map(async item => {
      await PaymentOrderProduct.create({
        ...item,
        price: item.total / item.quantity,
        payment_order_id: paymentOrder.id
      });
    });
  }
}

module.exports = PaymentOrderController;
