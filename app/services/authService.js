import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

/**
 * Prepare CSRF headers for state-changing requests
 */
async function getCsrfHeaders() {
  await getCsrfCookie();
  const xsrfToken = getCookie("XSRF-TOKEN");

  if (!xsrfToken) {
    throw new Error("XSRF-TOKEN cookie not found after fetching CSRF cookie.");
  }

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
  };
}

/**
 * GET AUTHENTICATED USER
 */
export async function getUser(config = {}) {
  // Server-side
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    return apiClient.get("/api/user", {
      ...config,
      headers: {
        ...config.headers,
        Cookie: cookieStore.toString(),
        Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      },
    });
  }

  // Client-side
  if (Object.keys(config).length === 0) {
    const headers = await getCsrfHeaders();

    return apiClient.get("/api/user", {
      headers,
      withCredentials: true,
    });
  }

  return apiClient.get("/api/user", {
    ...config,
    withCredentials: true,
  });
}

/**
 * LOGIN
 */
export async function loginService(email, password) {
  const headers = await getCsrfHeaders();

  return apiClient.post(
    "/login",
    { email, password },
    { headers, withCredentials: true },
  );
}

/**
 * LOGOUT
 */
export async function logoutService() {
  const headers = await getCsrfHeaders();

  return apiClient.post("/logout", {}, { headers, withCredentials: true });
}

/**
 * REGISTER
 */
export async function registerService(
  name,
  email,
  password,
  password_confirmation,
) {
  const headers = await getCsrfHeaders();

  return apiClient.post(
    "/register",
    { name, email, password, password_confirmation },
    { headers, withCredentials: true },
  );
}

/**
 * FORGOT PASSWORD
 */
export async function forgotPasswordService(email) {
  const headers = await getCsrfHeaders();

  return apiClient.post(
    "/forgot-password",
    { email },
    { headers, withCredentials: true },
  );
}

/**
 * RESET PASSWORD
 */
export async function resetPasswordService(
  token,
  email,
  password,
  password_confirmation,
) {
  const headers = await getCsrfHeaders();

  return apiClient.post(
    "/reset-password",
    { token, email, password, password_confirmation },
    { headers, withCredentials: true },
  );
}

/**
 * RESEND EMAIL VERIFICATION
 */
export async function verifyEmailService() {
  const headers = await getCsrfHeaders();

  return apiClient.post(
    "/email/verification-notification",
    {},
    { headers, withCredentials: true },
  );
}

// import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

// export const authService = {
//   async getUser(config = {}) {
//     //Server-Side Logic
//     if (typeof window === "undefined") {
//       const { cookies } = await import("next/headers");
//       const cookieStore = await cookies();

//       return apiClient.get("/api/user", {
//         ...config,
//         headers: {
//           ...config.headers,
//           Cookie: cookieStore.toString(),
//           Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
//         },
//       });
//     }

//     //Client-Side
//     if (Object.keys(config).length === 0) {
//       await getCsrfCookie();
//       const xsrfToken = getCookie("XSRF-TOKEN");

//       if (!xsrfToken) {
//         throw new Error(
//           "XSRF-TOKEN cookie not found after fetching CSRF cookie.",
//         );
//       }

//       return apiClient.get("/api/user", {
//         headers: {
//           "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
//           Accept: "application/json",
//         },
//         withCredentials: true,
//       });
//     }

//     return apiClient.get("/api/user", {
//       ...config,
//       withCredentials: true,
//     });
//   },

//   async login(email, password) {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error(
//         "XSRF-TOKEN cookie not found after fetching CSRF cookie.",
//       );
//     }

//     return apiClient.post(
//       "/login",
//       { email, password },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//         },
//         withCredentials: true,
//       },
//     );
//   },

//   async logout() {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error(
//         "XSRF-TOKEN cookie not found after fetching CSRF cookie.",
//       );
//     }

//     return apiClient.post(
//       "/logout",
//       {},
//       {
//         withCredentials: true,
//         headers: {
//           "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//           Accept: "application/json",
//         },
//       },
//     );
//   },

//   async register(name, email, password, password_confirmation) {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error(
//         "XSRF-TOKEN cookie not found after fetching CSRF cookie.",
//       );
//     }

//     return apiClient.post(
//       "/register",
//       {
//         name,
//         email,
//         password,
//         password_confirmation,
//       },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//         },
//         withCredentials: true,
//       },
//     );
//   },

//   async forgotPassword(email) {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error(
//         "XSRF-TOKEN cookie not found after fetching CSRF cookie.",
//       );
//     }

//     return apiClient.post(
//       "/forgot-password",
//       { email },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//         },
//         withCredentials: true,
//       },
//     );
//   },

//   async resetPassword(token, email, password, password_confirmation) {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     if (!xsrfToken) {
//       throw new Error(
//         "XSRF-TOKEN cookie not found after fetching CSRF cookie.",
//       );
//     }

//     return apiClient.post(
//       "/reset-password",
//       {
//         token,
//         email,
//         password,
//         password_confirmation,
//       },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//         },
//         withCredentials: true,
//       },
//     );
//   },

//   async verifyEmail() {
//     await getCsrfCookie();
//     const xsrfToken = getCookie("XSRF-TOKEN");

//     return apiClient.post(
//       "/email/verification-notification",
//       {},
//       {
//         headers: {
//           "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
//           Accept: "application/json",
//         },
//       },
//     );
//   },
// };
