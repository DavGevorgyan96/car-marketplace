import { fetchCarById } from "@/utils/api";
import { Car } from "@/types/cars";
import CarSlider from "@/components/CarSlider";
import {
  FaGasPump,
  FaRoad,
  FaCarSide,
  FaCogs,
  FaTachometerAlt,
  FaPalette,
  FaUserAlt,
  FaKey,
} from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import Link from "next/link";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarPage({ params }: CarPageProps) {
  const resolvedParams = await params;
  const uniqueId = resolvedParams.id;

  const car: Car = await fetchCarById(uniqueId);

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:items-center  gap-6">
        <Link
          href="/"
          className="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md max-w-max"
          aria-label="Перейти на главную страницу"
        >
          ← На главную
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left text-gray-200 break-words mb-8">
          {car.mark_id} ({car.year})
        </h1>
      </div>

      <div className="max-w-6xl mx-auto mb-12">
        {car?.images?.image?.length ? (
          <CarSlider images={car.images.image} />
        ) : (
          <p className="text-center text-gray-500">Изображения отсутствуют</p>
        )}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <CarSpec
          icon={<FaKey />}
          label="Цена"
          value={`${car.price.toLocaleString()} ₽`}
        />
        <CarSpec icon={<FaRoad />} label="Пробег" value={`${car.run} км`} />
        <CarSpec icon={<FaCarSide />} label="Кузов" value={car.body_type} />
        <CarSpec icon={<FaCogs />} label="КПП" value={car.gearbox} />
        <CarSpec icon={<FaTachometerAlt />} label="Привод" value={car.drive} />
        <CarSpec icon={<FaGasPump />} label="Топливо" value={car.engine_type} />
        <CarSpec
          icon={<FaGasPump />}
          label="Объём двигателя"
          value={`${car.engine_volume} л`}
        />
        <CarSpec
          icon={<FaTachometerAlt />}
          label="Мощность"
          value={car.engine_power}
        />
        <CarSpec icon={<FaPalette />} label="Цвет" value={car.color} />
        <CarSpec
          icon={<MdCalendarToday />}
          label="Состояние"
          value={car.state}
        />
        <CarSpec
          icon={<FaUserAlt />}
          label="Владельцев"
          value={car.owners_number}
        />
        <CarSpec icon={<FaKey />} label="VIN" value={car.vin} />
      </section>

      {car.extras && (
        <section className="max-w-6xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 border-b border-gray-300 pb-2">
            Дополнительные опции
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-relaxed max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {car.extras.split(", ").map((item, i) => (
              <li
                key={i}
                className="hover:text-blue-600 transition-colors cursor-default"
                title={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

interface CarSpecProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function CarSpec({ icon, label, value }: CarSpecProps) {
  return (
    <div className="flex items-start p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-blue-600 text-xl mr-4 mt-1">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
