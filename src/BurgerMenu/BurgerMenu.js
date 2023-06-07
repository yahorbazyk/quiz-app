import React, { useState } from 'react';
import './BurgerMenu.css';

const BurgerMenu = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`burger-menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-button" onClick={handleToggle}>
        <span className={`burger-icon ${isOpen ? 'open' : ''}`}></span>
      </button>
      {isOpen && (
        <div className="menu-overlay" onClick={handleClose}>
          <ul>
            {items.map((item, index) => (
              <li key={index} onClick={item.onClick}>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
