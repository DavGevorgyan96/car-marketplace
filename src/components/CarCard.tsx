import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/cars";
import { CarCardActions } from "./CarCardActions";
import { FaGasPump, FaWrench } from "react-icons/fa";
import { FaRoad } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
      <Link href={`/cars/${car.unique_id}`}>
        <div className="relative w-full h-48">
          <Image
            src={car.images.image[0] || "/car-placeholder.jpg"}
            alt={`${car.mark_id} ${car.folder_id}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/cars/${car.unique_id}`}>
          <h3 className="text-base font-semibold text-gray-900 mb-2 hover:text-blue-600 transition">
            {car.mark_id}
          </h3>
        </Link>

        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold text-gray-900">
            {(car.price ?? 0).toLocaleString("ru-RU")} ₽
          </p>
          <p className="text-sm text-gray-500">
            от {(car.price ?? 0 / 70).toLocaleString("ru-RU")} ₽/мес
          </p>
        </div>

        <div className="flex flex-wrap gap-y-2 text-sm text-gray-600 mb-4">
          <div className="w-full flex items-center gap-1 font-medium text-gray-800">
            <FaWrench className="text-blue-600" />
            {car.modification_id}
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1 w-1/2">
              <FaRoad className="text-blue-600" />
              {(car.run ?? 0).toLocaleString("ru-RU")} км
            </div>
            <div className="flex items-center gap-1 w-1/2 pr-1">
              <FaCogs className="text-blue-600" />
              {car.gearbox}
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1 w-1/2">
              <FaGasPump className="text-blue-600" />
              {car.engine_type}
            </div>
            <div className="flex items-center gap-1 w-1/2">
              <MdColorLens className="text-blue-600" />
              {car.color}
            </div>
            <div className="flex items-center gap-1 w-1/2">
              <BsCalendar2Date className="text-blue-600" />
              {car.year}
            </div>
          </div>
        </div>

        <CarCardActions car={car} />
      </div>
    </div>
  );
};
