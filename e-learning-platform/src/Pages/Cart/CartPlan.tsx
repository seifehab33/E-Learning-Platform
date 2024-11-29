import React from "react";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "../../features/Cart/CartSlice";

const SelectedPlan: React.FC = () => {
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <section className="p-5 lg:p-0">
      <div className="w-full lg:max-w-sm mx-auto bg-[var(--nav-color)] text-white p-6 rounded-lg shadow-lg">
        {/* Selected Plan Header */}
        <div className="bg-[#392c7d] text-center py-2 rounded-t-md">
          <h3 className="text-lg font-bold">Selected Plan</h3>
        </div>

        {/* Plan Details */}
        <div className="py-4">
          <h4 className="text-2xl font-semibold mb-1">Basic</h4>
          <p className="text-sm text-gray-400 mb-2">
            For individuals who just need to start with the basic features
          </p>
          <p className="text-sm text-gray-400 mb-4">
            per user, per month when billed monthly
          </p>

          {/* Dynamic Price */}
          <p className="text-5xl font-bold mb-4">
            ${totalPrice ? totalPrice : "Price Not Available"}
          </p>

          {/* Benefits */}
          <div className="mb-4">
            <h5 className="font-semibold mb-2">Benefits</h5>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li>Access to slack community</li>
              <li>Access to support team</li>
              <li>Algorithmic bidding</li>
              <li>Keyword and ASIN harvesting</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h5 className="font-semibold mb-2">Features</h5>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li>Search term isolation</li>
              <li>Total sales analytics</li>
              <li>Best seller rank</li>
              <li>Placement optimization</li>
            </ul>
          </div>
        </div>

        {/* Change Plan Button */}
        <div className="mt-6">
          <button className="w-full py-2 border border-gray-500 text-white rounded-md hover:bg-gray-600 transition">
            Change the Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default SelectedPlan;
