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
      message: "Successfully Get Products",
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

export const handleDetailProduct = async (slug: string) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const response = await ApiProducts.detailProduct(config, slug);
    return {
      status: true,
      message: "Successfully Get Detail Product",
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
