import React, {PropTypes} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

function Loader({...props}) {
  const style = {};

  if (props.centered) {
    style.display = 'block';
    style.margin = 'auto';
    style.transform = 'translate(-50%, -50%)';
    style.position = 'absolute';
    style.left = '50%';
    style.top = '50%';
  }

  return (
    <CircularProgress style={style} />
  );
}

Loader.propTypes = {
  size: PropTypes.number,
  centered: PropTypes.bool
};

export default Loader;