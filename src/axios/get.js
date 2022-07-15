import axios from "axios";
import { base_url } from "./baseUri";

const request = async (uri, params) => {
  if (params) {
    axios.defaults.params = params;
  } else {
    axios.defaults.params = null;
  }

  const config = {
    url: `${base_url + uri}`,
    method: "GET",
    timeout: "60000",
  };

  try {
    const response = await axios(config);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    const object = {
      status: null,
      data: null,
    };
    if (err.response !== undefined) {
      object.status = err.response.status;
      object.data = err.response.data.msg;
    } else {
      object.status = 500;
      object.data = "Something went wrong";
    }

    return object;
  }
};

export default request;
