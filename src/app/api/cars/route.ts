import { NextResponse } from "next/server";

const API_BASE_URL = "https://testing-api.ru-rating.ru";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const apiUrl = new URL(`${API_BASE_URL}/cars`);

  searchParams.forEach((value, key) => {
    apiUrl.searchParams.append(key, value);
  });

  try {
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      return NextResponse.json(
        { error: `External API responded with ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
