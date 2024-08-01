import ApiProducts from "../../config/Endpoints/product";

export const handleProducts = async (position: number) => {
  try {
    const config = {
      params: {
        page: position,
      },
      headers: {
        "content-type": "application/json",
      },
    };
    const response = await ApiProducts.listProducts(config);
    return {
      status: true,
      message: "Login successful",
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
