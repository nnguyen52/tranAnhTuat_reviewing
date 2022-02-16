import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { motion } from 'framer-motion/dist/framer-motion';

const MovieCard = props => {

    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
const movieItem = {
  hidden: { opacity: 0 },
  show: (i) => ({
    opacity: 1,
    transition: {
      delay: i * .5,
    },
  }),
};
    return (
      <motion.div custom={props.i} variants={movieItem}>
        <Link to={link}>
          <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
            <Button>
              <i className="bx bx-play"></i>
            </Button>
          </div>
          <h3>{item.title || item.name}</h3>
        </Link>
      </motion.div>
    );
}

export default MovieCard;
