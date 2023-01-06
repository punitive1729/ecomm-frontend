import './category-item.styles.scss';
import { useNavigate } from 'react-router';
const CategoryItem = ({ category }) => {
  // props = {key, category}
  const { title, imageUrl } = category;
  const navigate = useNavigate();

  const goToShopItem = () => {
    navigate(`/shop/${title.toLowerCase()}`);
  };

  return (
    <div className='category-container' onClick={goToShopItem}>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='category-body-container'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
