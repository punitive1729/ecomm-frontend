import Categories from './components/categories.component';
import { categories } from './utils/categories.constant';

const App = () => {
  return <Categories categories={categories} />;
};

export default App;
