// send Get and POSt req
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const fetchData = async (endpoint, method = "GET", body = null, extraHeaders = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...extraHeaders,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("Could not fetch data:", error);
    throw error;
  }
};
