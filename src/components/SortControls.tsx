"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export const SortControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  const [isPending, startTransition] = useTransition();

  const handleSortChange = (sort: "asc" | "desc" | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (sort) {
      params.set("sort", sort);
      params.set("page", "1");
    } else {
      params.delete("sort");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const baseBtnClasses =
    "px-5 py-2 rounded-md font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500";

  return (
    <section
      aria-label="Controls for sorting cars"
      className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-center"
    >
      <h2 className="text-lg font-semibold text-gray-200 shrink-0">
        Сортировка:
      </h2>
      <div className="flex flex-wrap gap-3">
        <button
          disabled={isPending}
          onClick={() => handleSortChange(null)}
          aria-pressed={!currentSort}
          className={`${baseBtnClasses} ${
            !currentSort
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } ${isPending ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
        >
          По умолчанию
        </button>

        <button
          disabled={isPending}
          onClick={() => handleSortChange("asc")}
          aria-pressed={currentSort === "asc"}
          className={`${baseBtnClasses} ${
            currentSort === "asc"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } ${isPending ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
        >
          Цена по возрастанию
        </button>

        <button
          disabled={isPending}
          onClick={() => handleSortChange("desc")}
          aria-pressed={currentSort === "desc"}
          className={`${baseBtnClasses} ${
            currentSort === "desc"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } ${isPending ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
        >
          Цена по убыванию
        </button>
      </div>
    </section>
  );
};
