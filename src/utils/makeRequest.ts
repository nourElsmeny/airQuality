import axios, { AxiosRequestHeaders } from "axios";
import { APIError } from "../common/apiError";
const makeRequest = async (args: {
  method?: "get" | "post" | "put" | "delete";
  path: string;
  context?: object;
  params?: object;
  headers?: AxiosRequestHeaders;
}): Promise<any> => {
  try {
    const {
      method = "get",
      path,
      params = {},
      context = {},
      headers = {},
    } = args;

    const { data } = await axios({
      method,
      url: `${path}`,
      params,
      data: context,
      headers,
    });

    return data;
  } catch (e: any) {
    const serviceError = `⚠️ Service Error - api.airvisual.com: `;
    if (e.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      const {
        response: {
          status,
          data: {
            data: { message },
          },
        },
      } = e;

      // eslint-disable-next-line no-bitwise
      throw new APIError(status, `${serviceError}${message}`);
    } else if (e.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      throw new APIError(
        500,
        `${serviceError}Something went wrong, please try again.`
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', e.message);

      throw new APIError(
        500,
        `${serviceError}Something went wrong, please try again.`
      );
    }
  }
};

export default makeRequest;
