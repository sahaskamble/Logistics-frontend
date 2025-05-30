'use client';
import { Package, Warehouse, Truck, Ship, ShieldCheck } from 'lucide-react';

export default function WhiteCard() {
  const icons = [
    { label: "Freight", icon: <Package size={24} /> },
    { label: "Warehousing", icon: <Warehouse size={24} /> },
    { label: "Trucking", icon: <Truck size={24} /> },
    { label: "Ocean Freight", icon: <Ship size={24} /> },
    { label: "Customs", icon: <ShieldCheck size={24} /> },
  ];

  return (
    <div>
      <section className="hidden sm:flex justify-center items-center h-screen w-full">
        <div className="white-card relative h-[70%] w-[90%] bg-white">

          {/* Centered green line */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[58%] h-1 bg-[#16A34A] z-0" />

          {/* Icons and labels placed above the line */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[60%] flex justify-between z-10">
            {icons.map((icon, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-green-100 text-green-700 p-3 rounded-full mt-3">
                  {icon.icon}
                </div>
                <p className="mt-2 text-sm font-medium text-black text-center">{icon.label}</p>
              </div>
            ))}
          </div>

        </div>

      </section>
    </div>
  );
}