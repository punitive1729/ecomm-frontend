import Categories from '../../components/categories.component';
import { categories } from '../../utils/categories.constant';

const Home = () => {
  return (
    <div>
      <Categories categories={categories} />
    </div>
  );
};

export default Home;
