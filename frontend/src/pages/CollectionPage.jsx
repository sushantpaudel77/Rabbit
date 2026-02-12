import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sideBarRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClickOutside = (e) => {
    if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: 'Product 1',
          price: 100.7,
          images: [{ url: 'https://picsum.photos/500/500?3' }],
        },
        {
          _id: 2,
          name: 'Product 2',
          price: 125.11,
          images: [{ url: 'https://picsum.photos/500/500?4' }],
        },
        {
          _id: 3,
          name: 'Product 3',
          price: 155.55,
          images: [{ url: 'https://picsum.photos/500/500?5' }],
        },
        {
          _id: 4,
          name: 'Product 4',
          price: 175.1,
          images: [{ url: 'https://picsum.photos/500/500?6' }],
        },
        {
          _id: 5,
          name: 'Product 1',
          price: 100.7,
          images: [{ url: 'https://picsum.photos/500/500?7' }],
        },
        {
          _id: 6,
          name: 'Product 2',
          price: 125.11,
          images: [{ url: 'https://picsum.photos/500/500?8' }],
        },
        {
          _id: 7,
          name: 'Product 3',
          price: 155.55,
          images: [{ url: 'https://picsum.photos/500/500?9' }],
        },
        {
          _id: 8,
          name: 'Product 4',
          price: 175.1,
          images: [{ url: 'https://picsum.photos/500/500?10' }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  });

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sideBarRef}
        className={`${isSideBarOpen ? 'translate-x-0' : '-translate-x-full'}
      fixed inset-y-0 z-50 w-60 left-0 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0
      `}
      >
        <FilterSidebar />
      </div>
      <div className="flex flex-col grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* Sort collection */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
