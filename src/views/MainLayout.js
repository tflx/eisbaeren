import React, {PropTypes} from 'react';
import MainContainer from '../components/MainContainer/MainContainer';


const MainLayout = ({children}) => (
  <div>
    <MainContainer>
      {children}
    </MainContainer>

  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;