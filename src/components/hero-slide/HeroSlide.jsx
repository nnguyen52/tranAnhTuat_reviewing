import React, { useState, useEffect, useRef } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';
import { useHistory } from 'react-router';

import { motion, useAnimation } from "framer-motion/dist/framer-motion";
import { useInView } from "react-intersection-observer";

const HeroSlide = () => {
    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                setMovieItems(response.results.slice(1, 5));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 5000}}
            >
                {
                    movieItems.map((data , i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem index={i} data={data } className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            }
            </div>
        </div>
    );
}

const HeroSlideItem = props => {
    const controls = useAnimation();

    const { ref, inView } = useInView({
      threshold: 0,
    }); 
    let hisrory = useHistory();

    const data = props.data; 

useEffect(() => {
    if (inView || props.index == 0)  return controls.start("show"); 
} , [ controls , props ])

    const background = apiConfig.originalImage(data .backdrop_path ? data.backdrop_path : data.poster_path);

    const setModalActive = async () => {
        // select the specific modal
        const modal = document.querySelector(`#modal_${data .id}`);
        
        const videos = await tmdbApi.getVideos(category.movie, data .id);

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }
        modal.classList.toggle('active');
    }
    // staggerChildren with framer 
    const container = {
      hidden: { opacity: 0 , y : 50  },
      show: {
        opacity: 1,
         y: 100 ,
        transition: {
          staggerChildren: .8,
        },
      },
    };
    const item = {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    };
    return (
      <div
        className={`hero-slide__item`}
        style={{
          backgroundImage: `url(${background}) `,
        }}
        ref={ref}
      >
        <div className="hero-slide__item__content container"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="hero-slide__item__content__info"
          >
            <motion.h2 variants={item} className="title">
              {data.title}
            </motion.h2>
            <motion.div variants={item} className="overview">
              {data.overview}
            </motion.div>
            <motion.div variants={item} className="btns">
              <Button onClick={() => hisrory.push("/movie/" + data.id)}>
                Watch now
              </Button>
              <OutlineButton onClick={setModalActive}>
                Watch trailer
              </OutlineButton>
            </motion.div>
          </motion.div>
          <div className="hero-slide__item__content__poster">
            <img src={apiConfig.w500Image(data.poster_path)} alt="" />
          </div>
        </div>
      </div>
    );
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;
