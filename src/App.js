import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Routes from './config/Routes';

// framer motion
import { AnimatePresence } from "framer-motion/dist/framer-motion"; 
function App() {
    return (
      <AnimatePresence exitBeforeEnter>
        <BrowserRouter>
          <Route
            render={(props) => (
              <>
                <Header {...props} />
                <Routes />

                <Footer />
              </>
            )}
          />
        </BrowserRouter>
      </AnimatePresence>
    );
}

export default App;
