import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import './categories-preview.styles.scss';
import ProductCard from '../../components/product-card.component';
const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={categoriesMap[title]}>
          <h2 className='category-preview-title'>
            <Link to={title}>{title.toUpperCase()}</Link>
          </h2>
          <div className='products-container'>
            {categoriesMap[title].map(
              (product, idx) =>
                idx < 4 && <ProductCard key={product.id} product={product} />
            )}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default CategoriesPreview;
