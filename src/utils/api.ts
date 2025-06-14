import { Car, CarsResponse } from "@/types/cars";

const getBaseUrl = (): string => {
  if (!process.env.BASE_URL) {
    throw new Error("Missing BASE_URL environment variable");
  }
  return process.env.BASE_URL;
};

export const fetchCars = async (
  page: number = 1,
  sort?: "asc" | "desc"
): Promise<CarsResponse> => {
  const params = new URLSearchParams({
    _limit: "12",
    _page: page.toString(),
  });

  if (sort) {
    params.append("_sort", "price");
    params.append("_order", sort);
  }

  const baseUrl = getBaseUrl();

  const response = await fetch(`${baseUrl}/api/cars?${params.toString()}`, {
    // SSR fetch — отключаем кэш (особенно важно на Vercel)
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cars. Status: ${response.status}`);
  }

  return response.json();
};

export const fetchCarById = async (uniqueId: string): Promise<Car> => {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/api/cars/${uniqueId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Car not found. Status: ${res.status}`);
  }

  const json = await res.json();
  return json?.data?.[0];
};
