import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsListPage from './pages/ProductsListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        {/* Компонент Header будет виден на всех страницах */}
        <Header />

        {/* Настройка маршрутов */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/products-list" component={ProductsListPage} />
          <Route path="/products/:id" component={ProductDetailPage} />
          <Route component={NotFoundPage} />  {/* Обработка несуществующих страниц */}
        </Switch>

        {/* Компонент Footer будет виден на всех страницах */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
