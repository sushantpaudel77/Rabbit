import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const newArrivals = [
    {
      _id: '1',
      name: 'Stylish Jacket',
      price: 120,
      image: [{ url: 'https://picsum.photos/500/500?1', altText: 'Jacket' }],
    },
    {
      _id: '2',
      name: 'Stylish Jacket',
      price: 120,
      image: [{ url: 'https://picsum.photos/500/500?2', altText: 'Jacket' }],
    },
    {
      _id: '3',
      name: 'Stylish Jacket',
      price: 120,
      image: [{ url: 'https://picsum.photos/500/500?3', altText: 'Jacket' }],
    },
    {
      _id: '4',
      name: 'Stylish Jacket',
      price: 120,
      image: [{ url: 'https://picsum.photos/500/500?4', altText: 'Jacket' }],
    },
    {
      _id: '5',
      name: 'Stylish Jacket',
      price: 120,
      image: [{ url: 'https://picsum.photos/500/500?5', altText: 'Jacket' }],
    },
    {
      _id: '6',
      name: 'Stylish Jacket',
      price: 120,
      image: [{ url: 'https://picsum.photos/500/500?6', altText: 'Jacket' }],
    },
    {
      _id: '7',
      name: 'Stylish Jacket',
      price: 120,
      image: [{ url: 'https://picsum.photos/500/500?7', altText: 'Jacket' }],
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const amount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Update immediately
    updateScrollButtons();

    // Add scroll listener
    container.addEventListener('scroll', updateScrollButtons);

    // Use ResizeObserver to detect when container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateScrollButtons();
    });
    resizeObserver.observe(container);

    // Also update after images load
    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) {
        updateScrollButtons();
      } else {
        img.addEventListener('load', updateScrollButtons);
      }
    });

    // Fallback: update after a short delay
    const timeout = setTimeout(updateScrollButtons, 100);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      resizeObserver.disconnect();
      clearTimeout(timeout);
      images.forEach((img) => {
        img.removeEventListener('load', updateScrollButtons);
      });
    };
  }, []);
  
  return (
    <section className="container mx-auto px-4 py-14 lg:px-0">
      {/* Header */}
      <div className="relative text-center mb-14">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the latest styles off the runway, freshly added to keep your
          wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 -bottom-10 flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded border transition ${
              canScrollLeft
                ? 'bg-white hover:bg-gray-100'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded border transition ${
              canScrollRight
                ? 'bg-white hover:bg-gray-100'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Products */}
      <div
        ref={scrollRef}
        className={`w-full overflow-x-auto overflow-y-hidden flex gap-6 scrollbar-hide ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-full sm:min-w-[50%] lg:min-w-[30%] relative rounded-lg overflow-hidden"
          >
            <img
              src={product.image[0].url}
              alt={product.image[0].altText}
              className="w-full h-full object-cover rounded-lg"
              draggable="false"
            />

            <div className="absolute bottom-0 inset-x-0 bg-black/50 backdrop-blur-md text-white p-4">
              <Link to={`/product/${product._id}`}>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
