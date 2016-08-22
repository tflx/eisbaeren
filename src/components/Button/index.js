import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from 'components/Loader';

const buttonStyle = {
  flex: '0 1 auto',
  boxShadow: 'none',
  border: '1px solid lightgrey',
  marginLeft: '-1px',
};

const labelStyle = {
  paddingLeft: '0px'
};

const loaderStyle = {
  top: '-7px',
  float: 'left'
};

function Button({...props}) {
  const {disabled, label, status} = props;
  const fetching = status === 'processing';
  return (
    <RaisedButton labelStyle={fetching ? labelStyle : null} style={buttonStyle} disabled={disabled} label={label}>
      {fetching ?
        <Loader style={loaderStyle} size={0.3} /> : null
      }
    </RaisedButton>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  status: PropTypes.oneOf(['active', 'inactive', 'default', 'processing']),
  icon: PropTypes.node
};

Button.defaultPropTypes = {
  disabled: false,
  status: 'default',
};

export default Button;