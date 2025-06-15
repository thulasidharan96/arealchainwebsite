import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

// Extend Session type to include accessToken
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

// Create base API instance with default headers
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // Changed default to JSON
  },
});

// Add a request interceptor to attach token dynamically before each request
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for logging (only in development)
if (process.env.NODE_ENV !== "production") {
  api.interceptors.response.use(
    (response) => {
      console.log("API Response:", response.status, response.data);
      return response;
    },
    (error) => {
      console.error("API Error:", error.response?.status, error.response?.data);
      return Promise.reject(error);
    }
  );
}

// Helper function to create API instance with custom headers
export const createApiWithHeaders = (customHeaders: Record<string, string>) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      ...customHeaders,
    },
  });
};

// Helper function for multipart/form-data requests
export const apiFormData = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add interceptors to form-data API as well
apiFormData.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to make requests with custom headers
export const apiRequest = async (
  config: AxiosRequestConfig & {
    customHeaders?: Record<string, string>;
  }
) => {
  const { customHeaders, ...axiosConfig } = config;

  const session = await getSession();
  const headers: Record<string, string> = {
    ...(axiosConfig.headers as Record<string, string>),
    ...(customHeaders || {}),
  };

  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  return axios({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    ...axiosConfig,
    headers,
  });
};

// Predefined API instances for common content types
export const apiJSON = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiXML = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/xml",
  },
});

export const apiText = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "text/plain",
  },
});

// Add interceptors to all predefined instances
[apiJSON, apiXML, apiText, apiFormData].forEach((instance) => {
  instance.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers["Authorization"] = `Bearer ${session.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  if (process.env.NODE_ENV !== "production") {
    instance.interceptors.response.use(
      (response) => {
        console.log("API Response:", response.status, response.data);
        return response;
      },
      (error) => {
        console.error(
          "API Error:",
          error.response?.status,
          error.response?.data
        );
        return Promise.reject(error);
      }
    );
  }
});

export default api;
