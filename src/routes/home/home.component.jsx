import './home.styles.scss';
import CategoryItem from '../../components/category-item.component';
import { categories } from './../../utils/categories.constant';

const Home = () => {
  return (
    <div className='categories-container'>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Home;
