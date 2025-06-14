import { Car, CarsResponse } from "@/types/cars";

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

  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    : "";

  const response = await fetch(`${baseUrl}/api/cars?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }

  return response.json();
};

export async function fetchCarById(uniqueId: string): Promise<Car> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/cars/${uniqueId}`);

  if (!res.ok) throw new Error("Car not found");

  const json = await res.json();

  return json?.data?.[0];
}
