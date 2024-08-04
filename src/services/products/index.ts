import ApiProducts from "../../config/Endpoints/product";

interface Params {
  page?: number;
  category_slug?: string;
}

export const handleProducts = async (
  position: number,
  category: string | undefined = ""
) => {
  try {
    const params: Params = {};
    if (position) {
      params.page = position;
    }
    if (category) {
      params.category_slug = category;
    }
    const config = {
      params,
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
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "The server encountered an error. Please try again later.",
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
