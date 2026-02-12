import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';

const selectedProducts = {
  name: 'Stylish Jacket',
  price: 120,
  originalPrice: 150,
  description: 'This is stylish jacket perfect for any occasion.',
  brand: 'H&M',
  material: 'Leather',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Red', 'Black', 'Green'],
  images: [
    {
      url: 'https://picsum.photos/500/500?1',
      altText: 'Stylish Jacket 1',
    },
    {
      url: 'https://picsum.photos/500/500?2',
      altText: 'Stylish Jacket 2',
    },
  ],
};

const similarProducts = [
  {
    _id: 1,
    name: 'Product 1',
    price: 100.7,
    images: [{ url: 'https://picsum.photos/500/500?20' }],
  },
  {
    _id: 2,
    name: 'Product 2',
    price: 125.11,
    images: [{ url: 'https://picsum.photos/500/500?24' }],
  },
  {
    _id: 3,
    name: 'Product 3',
    price: 155.55,
    images: [{ url: 'https://picsum.photos/500/500?25' }],
  },
  {
    _id: 4,
    name: 'Product 4',
    price: 175.1,
    images: [{ url: 'https://picsum.photos/500/500?26' }],
  },
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (selectedProducts?.images?.length > 0) {
      setMainImage(selectedProducts.images[0].url);
    }
  }, [selectedProducts]);

  const handleQuantityChange = (action) => {
    if (action === 'minus') {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    } else if (action === 'plus') {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color before adding to cart', {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    setTimeout(() => {
      toast.success('Product added to cart!', {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProducts.images.map((image, index) => (
              <img
                draggable="false"
                className={`w-20 h-20 object-cover border cursor-pointer rounded-lg ${mainImage === image.url ? 'border-black' : 'border-gray-300'}`}
                key={index}
                src={image.url}
                alt={image.altText || image.name}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                draggable="false"
                src={mainImage}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProducts.images.map((image, index) => (
              <img
                className="w-20 h-20 object-cover border cursor-pointer rounded-lg"
                key={index}
                src={image.url}
                alt={image.altText || image.name}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Right Side */}
          <div className="md:w/12 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProducts.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProducts.originalPrice &&
                `${selectedProducts.originalPrice}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              $ {selectedProducts.price}
            </p>
            <p className="text-gray-700 mb-4">{selectedProducts.description}</p>
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProducts.colors.map((colors) => (
                  <button
                    onClick={() => setSelectedColor(colors)}
                    key={colors}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor == colors
                        ? 'border-4 border-black'
                        : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: colors.toLocaleLowerCase(),
                      filter: 'brightness(0.5)',
                    }}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProducts.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${selectedSize === size ? 'bg-black text-white' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange('minus')}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('plus')}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 
                ${isButtonDisabled ? 'cursor-not-allowed bg-black/50' : 'hover:bg-gray-900'}`}
            >
              {isButtonDisabled ? 'Adding...' : 'ADD TO CART'}
            </button>

            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProducts.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProducts.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-15">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
