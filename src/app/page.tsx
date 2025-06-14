import { CarsGrid } from "@/components/CarsGrid";
import Loader from "@/components/Loader";
import { Suspense } from "react";

interface Props {
  searchParams?: Promise<{
    page?: string;
    sort?: "asc" | "desc";
  }>;
}

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;  // вот здесь await

  const parsedPage = Number(resolvedSearchParams?.page);
  const page = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const sort = resolvedSearchParams?.sort === "desc" ? "desc" : "asc";

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Автомобили Kia</h1>
      <Suspense fallback={<Loader />}>
        <CarsGrid page={page} sort={sort} />
      </Suspense>
    </main>
  );
}
