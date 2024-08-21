"use server";
import { Client } from "square";
import { randomUUID } from "crypto";

import { locationId } from "@/app/constants/envReferences";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { paymentsApi, ordersApi } = new Client({
  accessToken: process.env.NODE_PUBLIC_SQUAREUP_ACCESS_TOKEN,
  environment: "sandbox",
});

export async function submitPayment(sourceId, orderId, orderAmount) {
  try {
    const { result } = await paymentsApi.createPayment({
      autocomplete: false,
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "USD",
        amount: orderAmount,
      },
      orderId: orderId,
    });
    return result;
  } catch (error) {
    console.log({ error });
    const errorBody = JSON.parse(error.body);
    return errorBody;
  }
}

export async function listPayments() {
  try {
    const { result } = await paymentsApi.listPayments();
    console.log({ listPaymentsResult: result });
  } catch (error) {
    console.log({ listPaymentsError: error });
  }
}

export async function createOrder(lineItems) {
  try {
    const { result } = await ordersApi.createOrder({
      idempotencyKey: randomUUID(),
      order: {
        locationId: locationId,
        lineItems,
        state: "OPEN",
      },
    });
    console.log({ createOrderResult: result });
    return result;
  } catch (error) {
    console.log({ createOrderError: error });
    const errorBody = JSON.parse(error.body);
    return errorBody;
  }
}

export async function payOrder(paymentId, orderId, orderVersion) {
  try {
    const { result } = await ordersApi.payOrder(orderId, {
      idempotencyKey: randomUUID(),
      paymentIds: [paymentId],
      orderVersion: orderVersion,
    });
    console.log({ payOrderResult: result });
    return result;
  } catch (error) {
    console.log({ payOrderError: error, message: error.message });

    const errorBody = error.body;

    if (errorBody) {
      const errorBodyParsed = JSON.parse(errorBody);
      const errors = errorBodyParsed.errors;
      const error = errors[0];
      const errorDetail = error.detail;
      const errorField = error.field;

      if (errorField === "order.version") {
        const versionNumbers = errorDetail
          .match(/^\d+|\d+\b|\d+(?=\w)/g)
          .map(function (v) {
            return +v;
          });

        const retryVersionNumber = versionNumbers[1];
        const retryPayOrderResults = await payOrder(
          paymentId,
          orderId,
          retryVersionNumber
        );

        return retryPayOrderResults;
      }

      return errorDetail;
    }

    return error.message;
  }
}
