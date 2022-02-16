import React from 'react';
import { Link } from 'react-router-dom';

import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';

import { category, movieType, tvType } from '../api/tmdbApi';
import { motion } from 'framer-motion/dist/framer-motion';
const Home = () => {
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: .5,
      },
    },
  };
 
  const cateItem = {
    hidden : {opacity : 0 } ,
    show : {opacity : 1 }
  }
    return (
      <motion.div>
        <HeroSlide />
        {/* container */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container"
        >
          <motion.div variants={cateItem} className="section mb-3">
            <div className="section__header mb-2">
              <h2>Trending Movies</h2>
              <Link to="/movie">
                <OutlineButton className="small">View more</OutlineButton>
              </Link>
            </div>
            <MovieList category={category.movie} type={movieType.popular} />
          </motion.div>

          <motion.div variants={cateItem} className="section mb-3">
            <div className="section__header mb-2">
              <h2>Top Rated Movies</h2>
              <Link to="/movie">
                <OutlineButton className="small">View more</OutlineButton>
              </Link>
            </div>
            <MovieList category={category.movie} type={movieType.top_rated} />
          </motion.div>

          <motion.div variants={cateItem} className="section mb-3">
            <div className="section__header mb-2">
              <h2>Trending TV</h2>
              <Link to="/tv">
                <OutlineButton className="small">View more</OutlineButton>
              </Link>
            </div>
            <MovieList category={category.tv} type={tvType.popular} />
          </motion.div>

          <motion.div variants={cateItem} className="section mb-3">
            <div className="section__header mb-2">
              <h2>Top Rated TV</h2>
              <Link to="/tv">
                <OutlineButton className="small">View more</OutlineButton>
              </Link>
            </div>
            <MovieList category={category.tv} type={tvType.top_rated} />
          </motion.div>
        </motion.div>
      </motion.div>
    );
}

export default Home;
