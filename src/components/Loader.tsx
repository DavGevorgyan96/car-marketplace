// components/Loader.tsx

import { FaSpinner } from "react-icons/fa";

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-10">
    <FaSpinner className="animate-spin text-blue-600 text-4xl mb-2" />
    <p className="text-gray-600 text-sm">Загрузка автомобилей...</p>
  </div>
);

export default Loader;
