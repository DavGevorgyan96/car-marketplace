import { fetchCars } from "@/utils/api";
import { CarCard } from "@/components/CarCard";
import { Pagination } from "@/components/Pagination";
import { SortControls } from "@/components/SortControls";
import ClientOnly from "./ClientOnly";

interface CarsGridProps {
  page: number;
  sort: "asc" | "desc";
}

export const CarsGrid = async ({ page, sort }: CarsGridProps) => {
  const { data: cars, meta } = await fetchCars(page, sort);

  return (
    <div className="text-center">
      <ClientOnly>
        <SortControls />
      </ClientOnly>

      {cars.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl">Автомобили не найдены</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car, idx) => (
              <CarCard key={idx} car={car} />
            ))}
          </div>

          <Pagination currentPage={meta.page} totalPages={meta.last_page} />
        </>
      )}
    </div>
  );
};
