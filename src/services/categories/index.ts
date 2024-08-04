import ApiCategories from "../../config/Endpoints/category";

export const handleCategories = async () => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const response = await ApiCategories.listCategories(config);
    return {
      status: true,
      message: "Successfully Get Categories",
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
