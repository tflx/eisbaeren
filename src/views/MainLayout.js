import React, {PropTypes} from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MainContainer from '../components/MainContainer/MainContainer';


const MainLayout = ({children}) => (
  <div>
    <Header />
    <MainContainer>
      {children}
    </MainContainer>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;