import React, {Component, PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import up from '../../images/thumb-up.svg';
import down from '../../images/thumb-down.svg';

export default class Status extends Component {
  static propTypes = {
    className: PropTypes.string,
    status: PropTypes.number,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  }

  state = {

  };

  changeStatus = (event) => {
    const newStatus = parseInt(event.currentTarget.dataset.status, 10);
    console.log(typeof(newStatus));
    this.props.onClick(newStatus);
  }

  render() {
    const statusButtonStyle = {
      border: '1px solid lightgrey',
      marginRight: '10px',
      width: '40px',
      height: '40px',
      borderRadius: '50%'
    };

    const iconButtonStyle = {
      width: '16px',
      height: '16px',
    };

    const {status, className, disabled} = this.props;

    return (
      <span className={className}>
        <IconButton data-status="1" style={statusButtonStyle} iconStyle={iconButtonStyle} disabled={status === 1 || disabled} onClick={this.changeStatus}>
          <SvgIcon svg={up} />
        </IconButton>
        <IconButton data-status="2" style={statusButtonStyle} iconStyle={iconButtonStyle} disabled={status === 2 || disabled} onClick={this.changeStatus}>
          <SvgIcon svg={down} />
        </IconButton>
      </span>
    );
  }
}