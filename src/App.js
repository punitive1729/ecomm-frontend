import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Auth from './routes/auth/auth.component';

const Shop = () => {
  return <h1>Shop component</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/auth' element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default App;
