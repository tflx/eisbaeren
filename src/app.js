/* eslint-disable global-require */
import 'whatwg-fetch';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import './exports';
import './global/global.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/**
 * In dev, wait for the page to be ready before rendering. Otherwise you'll see when FOUC when reloading.
 * On production the scripts are placed at the bottom of the page, so everything is ready to go.
 */
if (process.env.NODE_ENV !== 'production') {
  acceptHotModules();
  document.addEventListener('DOMContentLoaded', () => configurePage());
} else {
  configurePage();
}

/**
 * Accept the modules for hot reloading. You'll need to this for all entry modules.
 */
function acceptHotModules() {
  if (module.hot) {
    module.hot.accept('./views/IndexView', () => configurePage());
  }
}

/**
 * Render the React components here.
 */
function configurePage() {
  // For a module to properly reloaded, require the module and access the default value.
  // const Index = require('./views/Index').default;

  // render(<Index />, document.getElementById('appMountPoint'));
  render(AppRouter, document.getElementById('appMountPoint'));
}

/**
 * When calling render, wrap node in AppContainer to enable Hot Reloading.
 */
function render(node, context) {
  if (module.hot) {
    const AppContainer = require('react-hot-loader').AppContainer;
    ReactDOM.render(<AppContainer>{node}</AppContainer>, context);
  } else {
    ReactDOM.render(node, context);
  }
}