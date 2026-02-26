import apiClient from "@/app/lib/api";
import { getCsrfHeaders } from "./httpHelpers";

/**
 * GET ORDERS (PAGINATED)
 */
export async function getOrders(page = 1) {
  const response = await apiClient.get(`/api/orders?page=${page}`, {
    withCredentials: true,
  });

  return response.data;
}

/**
 * GET SINGLE ORDER
 */
export async function getOrder(id) {
  const response = await apiClient.get(`/api/orders/${id}`, {
    withCredentials: true,
  });

  return response.data;
}

/**
 * CREATE ORDER
 */
export async function createOrder(paymentMethod) {
  const headers = await getCsrfHeaders();

  const response = await apiClient.post(
    "/api/orders",
    { payment_method: paymentMethod },
    { headers, withCredentials: true },
  );

  return response.data;
}

/**
 * CHECK PAYMENT STATUS
 */
export async function checkStatus(md5) {
  const headers = await getCsrfHeaders();
  const response = await apiClient.post(
    "/api/orders/check-status",
    { md5 },
    { headers, withCredentials: true },
  );

  return response.data;
}

/**
 * DOWNLOAD PRODUCT
 */
export async function downloadProduct(productId) {
  const response = await apiClient.get(`/api/orders/download/${productId}`, {
    responseType: "blob",
    withCredentials: true,
  });

  return response.data;
}

// import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

// const orderService = {
//   async getOrders(page = 1) {
//     const response = await apiClient.get(`/api/orders?page=${page}`);
//     return response.data;
//   },

//   async getOrder(id) {
//     const response = await apiClient.get(`/api/orders/${id}`);
//     return response.data;
//   },

//   async createOrder(paymentMethod) {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error("XSRF-TOKEN cookie not found.");
//     }

//     const response = await apiClient.post(
//       "/api/orders",
//       {
//         payment_method: paymentMethod,
//       },
//       {
//         headers: {
//           "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//         },
//       }
//     );
//     return response.data;
//   },

//   async checkStatus(md5) {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error("XSRF-TOKEN cookie not found.");
//     }

//     const response = await apiClient.post(
//       "/api/orders/check-status",
//       { md5 },
//       {
//         headers: {
//           "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//         },
//       }
//     );
//     return response.data;
//   },

//   async downloadProduct(productId) {
//     const response = await apiClient.get(`/api/orders/download/${productId}`, {
//       responseType: "blob",
//     });
//     return response.data;
//   },
// };

// export default orderService;
