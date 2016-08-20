import React, {PropTypes} from 'react';
import MainContainer from '../components/MainContainer/MainContainer';
import Navigation from '../components/Navigation/Navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import config from '../../mock-api/config.json';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: config.colors.secondary,
    primary2Color: config.colors.primary,
  }
});

const MainLayout = ({children}) => (
  <div>
    <MainContainer>
      <MuiThemeProvider muiTheme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </MainContainer>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Navigation />
    </MuiThemeProvider>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;