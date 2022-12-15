import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import SignInPage from './routes/sign-in/sign-in.component';

const Shop = () => {
  return <h1>Shop component</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/sign-in' element={<SignInPage />} />
      </Route>
    </Routes>
  );
};

export default App;
