import ApiOrder from "../../config/Endpoints/order";
import { OrderValues } from "../../types/containerTypes";

interface Params {
  page?: number;
}

export const handleOrders = async (position: number) => {
  try {
    const params: Params = {};
    if (position) {
      params.page = position;
    }
    const config = {
      params,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await ApiOrder.listOrder(config);
    return {
      status: true,
      message: "Successfully Get Order",
      data: response.data.data,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "The server encountered an error. Please try again later.",
    };
  }
};

export const handleStorOrder = async ({
  fullname,
  address,
  total_price,
  email,
  order_items,
}: OrderValues) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify({
      fullname,
      address,
      total_price,
      email,
      order_items,
    });
    const response = await ApiOrder.store(body, config);
    return {
      status: true,
      message: "Successful Order",
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "The server encountered an error. Please try again later.",
    };
  }
};
