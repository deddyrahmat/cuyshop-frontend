import ApiShipping from "../../config/Endpoints/shipping";

interface ShippingValues {
  destination: string;
  weight: number;
  courier: string;
}
export const handleCheckShiping = async ({
  destination,
  weight,
  courier,
}: ShippingValues) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify({
      destination: +destination,
      weight,
      courier,
    });
    const response = await ApiShipping.check(body, config);
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
