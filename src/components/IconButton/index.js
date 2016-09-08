import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import styles from './IconButton.css';

function AltIconButton({...props}) {
  const {icon, disabled, onClick} = props;

  const statusButtonStyle = {
    // border: '1px solid lightgrey',
    marginRight: '10px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    // backgroundColor: '#e5e5e5',
    boxShadow: 'rgba(0,0,0,0.117) 0px 1px 6px, rgba(0,0,0,0.117) 0px 1px 4px'
  };

  const iconButtonStyle = {
    width: '16px',
    height: '16px',
    // color: 'white',
  };

  return (
    <IconButton {...props} style={statusButtonStyle} iconStyle={iconButtonStyle} disabled={disabled} onClick={onClick} className={disabled ? null : styles.button}>
      {icon}
    </IconButton>
  );
}

AltIconButton.propTypes = {
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default AltIconButton;