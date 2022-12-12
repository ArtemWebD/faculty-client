import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "./styles/header.scss";

export const MainPage: React.FC = () => {
  return (
    <header className='header'>
      <div className="header__body">
        <div className="container">
          <div className="header__title">
            <h1>
              AccountingJS
            </h1>
          </div>
          <div className="header__subtitle">
            <h3>
              Система учета контингента студентов
            </h3>
          </div>
          <div className="header__button">
            <NavLink to='/students'>
              <Button variant='primary'>
                Начать работу
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
      <span className="header__blur"></span>
    </header>
  );
}