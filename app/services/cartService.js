import apiClient from "@/app/lib/api";
import { getCsrfHeaders } from "./httpHelpers";

/**
 * GET CART
 */
export async function getCart() {
  const response = await apiClient.get("/api/carts", {
    withCredentials: true,
  });

  return response.data;
}

/**
 * ADD TO CART
 */
export async function addToCartService(
  productId,
  licenseType = "standard",
  quantity = 1,
) {
  const headers = await getCsrfHeaders();

  const response = await apiClient.post(
    "/api/carts",
    {
      product_id: productId,
      license_type: licenseType,
      quantity,
    },
    { headers, withCredentials: true },
  );

  return response.data;
}

/**
 * UPDATE CART ITEM
 */
export async function updateCartItemService(id, data) {
  const headers = await getCsrfHeaders();

  const response = await apiClient.put(`/api/carts/${id}`, data, {
    headers,
    withCredentials: true,
  });

  return response.data;
}

/**
 * REMOVE CART ITEM
 */
export async function removeFromCartService(id) {
  const headers = await getCsrfHeaders();

  await apiClient.delete(`/api/carts/${id}`, {
    headers,
    withCredentials: true,
  });
}

/**
 * CLEAR CART
 */
export async function clearCartService() {
  const headers = await getCsrfHeaders();

  await apiClient.delete("/api/carts", {
    headers,
    withCredentials: true,
  });
}

// import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

// const cartService = {
//   async getCart() {
//     const response = await apiClient.get("/api/carts");
//     return response.data;
//   },

//   async addToCart(productId, licenseType = "standard", quantity = 1) {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error("XSRF-TOKEN cookie not found.");
//     }

//     const response = await apiClient.post(
//       "/api/carts",
//       {
//         product_id: productId,
//         license_type: licenseType,
//         quantity: quantity,
//       },
//       {
//         headers: {
//           "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//         },
//       }
//     );

//     return response.data;
//   },

//   async updateCartItem(id, data) {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error("XSRF-TOKEN cookie not found.");
//     }

//     const response = await apiClient.put(`/api/carts/${id}`, data, {
//       headers: {
//         "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//       },
//     });
//     return response.data;
//   },

//   async removeFromCart(id) {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error("XSRF-TOKEN cookie not found.");
//     }

//     await apiClient.delete(`/api/carts/${id}`, {
//       headers: {
//         "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//       },
//     });
//   },

//   async clearCart() {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error("XSRF-TOKEN cookie not found.");
//     }

//     await apiClient.delete("/api/carts", {
//       headers: {
//         "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//       },
//     });
//   },
// };

// export default cartService;
