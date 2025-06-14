"use client";

import { Car } from "@/types/cars";
import { AiOutlineHeart } from "react-icons/ai";
import { FaBalanceScale } from "react-icons/fa";

interface CarCardActionsProps {
  car: Car;
}

export const CarCardActions = ({ car }: CarCardActionsProps) => {
  const handleBuy = () => alert(`Купить ${car.mark_id} ${car.folder_id}`);
  const handleFavorite = () =>
    alert(`В избранное ${car.mark_id} ${car.folder_id}`);
  const handleCompare = () => alert(`Сравнить ${car.mark_id} ${car.folder_id}`);

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={handleFavorite}
        className="p-2 rounded-md bg-[#f1f3f6] hover:bg-[#e1e3e6] transition"
        aria-label="В избранное"
      >
        <AiOutlineHeart size={20} className="text-[#555]" />
      </button>

      <button
        onClick={handleCompare}
        className="p-2 rounded-md bg-[#f1f3f6] hover:bg-[#e1e3e6] transition"
        aria-label="Сравнить"
      >
        <FaBalanceScale size={18} className="text-[#555]" />
      </button>

      <button
        onClick={handleBuy}
        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition text-sm font-medium"
      >
        КУПИТЬ
      </button>
    </div>
  );
};
