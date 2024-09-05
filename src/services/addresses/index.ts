import ApiAddresses from "../../config/Endpoints/address";
import { AddressValues } from "../../types/containerTypes";

// interface AddressValues {
//   fullname: string;
//   phone: string;
//   address: string;
//   province_id: string;
//   city_id: string;
//   other: string;
//   main: number;
//   location: string;
// }

export const handleListProvincies = async () => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await ApiAddresses.listProvincies(config);
    return {
      status: true,
      message: "Successfully get list provincies",
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

interface Params {
  province_id?: number;
}

export const handleListCities = async (id: number) => {
  try {
    const params: Params = {};
    if (id) {
      params.province_id = id;
    }

    const config = {
      params,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await ApiAddresses.listCities(config);
    return {
      status: true,
      message: "Successfully get list cities",
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

export const handleListAddresses = async () => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await ApiAddresses.listAddresses(config);

    if (!response.data) {
      return {
        status: true,
        message: "Failed get list addresses",
      };
    }
    const addresses = response?.data?.data?.map((address: AddressValues) => ({
      ...address,
      main: address.main === 1 ? true : false, // Convert 1 to true and 0 to false
    }));

    return {
      status: true,
      message: "Successfully get list addresses",
      data: addresses,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "The server encountered an error. Please try again later.",
    };
  }
};

export const handleStoreAddress = async ({
  fullname,
  phone,
  address,
  province_id,
  city_id,
  other,
  main,
  location,
}: AddressValues) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify({
      fullname,
      phone,
      address,
      province_id,
      city_id,
      other,
      main,
      location,
    });
    const response = await ApiAddresses.store(body, config);
    return {
      status: true,
      message: "Successful Save Address",
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

export const handleupdateAddress = async (
  id: number,
  values: AddressValues
) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      fullname: values.fullname,
      phone: values.phone,
      address: values.address,
      province_id: values.province_id,
      city_id: values.city_id,
      other: values.other,
      main: values.main,
      location: values.location,
    });

    const response = await ApiAddresses.update(body, config, id);

    return {
      status: true,
      message: "Successfully updated address",
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error in handleUpdateAddress:", error);
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "The server encountered an error. Please try again later.",
    };
  }
};

export const handleRemoveAddresses = async (id: number) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await ApiAddresses.remove(config, id);
    return {
      status: true,
      message: "Successfully get list addresses",
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
