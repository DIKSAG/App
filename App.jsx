import React, { useState } from 'react';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const products = [
    { id: 1, name: 'Телефон', price: 10000 },
    { id: 2, name: 'Ноутбук', price: 50000 },
    { id: 3, name: 'Наушники', price: 3000 },
    { id: 4, name: 'Часы', price: 8000 },
    { id: 5, name: 'Планшет', price: 20000 }
  ];

  const theme = {
    background: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#ffffff' : '#333333',
    surface: isDark ? '#2d2d2d' : '#f5f5f5',
    primary: isDark ? '#666' : '#007bff'
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCurrentPage('cart');
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div>
            <h1>Добро пожаловать в магазин!</h1>
            <p>Выберите товары и добавьте их в корзину</p>
          </div>
        );
      case 'products':
        return (
          <div>
            <h1>Товары</h1>
            <div className="product-grid">
              {products.map(product => (
                <div key={product.id} className="product-card" style={{ background: theme.surface }}>
                  <h3>{product.name}</h3>
                  <p>Цена: {product.price} ₽</p>
                  <button 
                    className="add-button"
                    onClick={() => addToCart(product)}
                    style={{ background: theme.primary }}
                  >
                    В корзину
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'cart':
        return (
          <div>
            <h1>Корзина</h1>
            {cart.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              <>
                <div className="product-grid">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <span>{item.name} - {item.price} ₽</span>
                      <button 
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
                <div className="total">Итого: {getTotalPrice()} ₽</div>
              </>
            )}
          </div>
        );
      default:
        return <div>Страница не найдена</div>;
    }
  };

  return (
    <div className="app-container" style={{ 
      background: theme.background, 
      color: theme.text
    }}>
      <nav className="nav" style={{ background: theme.primary }}>
        <div className="nav-buttons">
          <button 
            className="nav-button"
            onClick={() => setCurrentPage('home')}
          >
            Главная
          </button>
          <button 
            className="nav-button"
            onClick={() => setCurrentPage('products')}
          >
            Товары
          </button>
          <button 
            className="nav-button"
            onClick={() => setCurrentPage('cart')}
          >
            Корзина ({cart.length})
          </button>
        </div>
        <button 
          className="theme-button"
          onClick={() => setIsDark(!isDark)}
          style={{ color: theme.primary }}
        >
          {isDark ? ' Светлая' : ' Тёмная'}
        </button>
      </nav>

      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;