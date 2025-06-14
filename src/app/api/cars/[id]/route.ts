import { NextResponse } from "next/server";

const API_BASE_URL = "https://testing-api.ru-rating.ru";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // params - промис!
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const apiUrl = `${API_BASE_URL}/cars/${id}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `External API responded with ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching car by id:", error);
    return NextResponse.json(
      { error: "Failed to fetch car" },
      { status: 500 }
    );
  }
}
