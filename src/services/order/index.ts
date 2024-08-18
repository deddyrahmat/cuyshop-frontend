import ApiOrder from "../../config/Endpoints/order";
import { OrderValues } from "../../types/containerTypes";

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
