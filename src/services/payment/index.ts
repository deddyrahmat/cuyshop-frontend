import ApiPayment from "../../config/Endpoints/payment";

interface checkoutValues {
  total: number;
  fullname: string;
  email: string;
}
export const handleCheckoutProduct = async ({
  total,
  fullname,
  email,
}: checkoutValues) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify({
      total,
      fullname,
      email,
    });
    const response = await ApiPayment.checkoutPayment(body, config);
    return {
      status: true,
      message: "Successful Save Address",
      data: response.data.data,
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
