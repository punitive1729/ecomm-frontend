import { useContext, useEffect, useState } from 'react';
import ProductCard from '../../components/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import { useParams } from 'react-router-dom';
import './category.styles.scss';

const Category = () => {
  const { title } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    setProducts(categoriesMap[title.toLocaleLowerCase()]);
  };
  useEffect(getProducts, [title, categoriesMap]);
  return (
    <>
      <h2 className='category-title-container'>
        <span className='category-title'>{title.toUpperCase()}</span>
      </h2>
      <div className='products-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
