/**
 * Expose modules here. They will be added to global.Components
 * This allows the server to render Components serverside and clientside.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import SvgIcon from './components/SvgIcon/SvgIcon';

global.React = React;
global.ReactDOM = ReactDOM;

global.Components = {
  SvgIcon
};