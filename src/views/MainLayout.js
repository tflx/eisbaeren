import React, {PropTypes} from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MainContainer from '../components/MainContainer/MainContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#3b18f1'
  }
});

const MainLayout = ({children}) => (
  <div>
    <Header />
    <MainContainer>
      <MuiThemeProvider muiTheme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </MainContainer>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;