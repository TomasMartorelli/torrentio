import React from 'react';
import Slider from '../../components/Slider/Slider';
import './Home.css';
import Carrousell from '../../components/GameCarrousell/Carrousell.jsx';

const Home = () => {
  return (
    <section className="home-container">
      <div className="main-content">
        <section className="carousel-banner">
          <Slider />
        </section>

        <section className="game-groups">
          <div className="game">
            <h2 className="group-title">Acción</h2>
            <div className="container-groups">
              <Carrousell genre="Acción" />
            </div>
          </div>

          <div className="game">
            <h2 className="group-title">Aventura</h2>
            <div className="container-groups">
              <Carrousell genre="Aventura" />
            </div>
          </div>

          <div className="game">
            <h2 className="group-title">RPG</h2>
            <div className="container-groups">
              <Carrousell genre="RPG" />
            </div>
          </div>

          <div className="game">
            <h2 className="group-title">Deportes</h2>
            <div className="container-groups">
              <Carrousell genre="Deportes" />
            </div>
          </div>

          <div className="game">
            <h2 className="group-title">Horror</h2>
            <div className="container-groups">
              <Carrousell genre="Horror" />
            </div>
          </div>

          <div className="game">
            <h2 className="group-title">FPS</h2>
            <div className="container-groups">
              <Carrousell genre="FPS" />
            </div>
          </div>

          <div className="game">
            <h2 className="group-title">Roguelike</h2>
            <div className="container-groups">
              <Carrousell genre="Roguelike" />
            </div>
          </div>

          <div className="game">
            <h2 className="group-title">Souls</h2>
            <div className="container-groups">
              <Carrousell genre="Souls" />
            </div>
          </div>

    

          <div className="game">
            <h2 className="group-title">Sandbox</h2>
            <div className="container-groups">
              <Carrousell genre="Sandbox" />
            </div>
          </div>

          <div className="game">
            <h2 className="group-title">Survival</h2>
            <div className="container-groups">
              <Carrousell genre="Survival" />
            </div>
          </div>

        </section>
      </div>
    </section>
  );
};

export default Home;