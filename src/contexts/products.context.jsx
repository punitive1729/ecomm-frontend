import { createContext, useEffect, useState } from 'react';
import PRODUCTS from './../shop-data.json';

export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const fetchProducts = () => {
    console.log('Fetching...');
    setProducts(PRODUCTS);
  };
  useEffect(fetchProducts, []);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
