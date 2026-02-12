import React from "react";
import { useSearchParams } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const value = e.target.value;

    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set("sortBy", value);
    } else {
      newParams.delete("sortBy");
    }

    setSearchParams(newParams);
  };

  return (
    <div className="mb-4 flex items-center justify-end gap-2">
      <div className="relative">
        <select
          id="sort"
          value={searchParams.get("sortBy") || ""}
          onChange={handleSortChange}
          className="appearance-none border border-gray-700 bg-white pl-3 pr-8 py-2 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20 hover:border-gray-400 transition"
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
          <option value="popularity">Popularity</option>
        </select>

        {/* Icon */}
        <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default SortOptions;
