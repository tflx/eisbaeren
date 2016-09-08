import React, {Component, PropTypes} from 'react';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import up from '../../images/thumb-up.svg';
import down from '../../images/thumb-down.svg';
import IconButton from 'components/IconButton';

export default class Status extends Component {
  static propTypes = {
    className: PropTypes.string,
    status: PropTypes.number,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  }

  changeStatus = (event) => {
    const newStatus = parseInt(event.currentTarget.dataset.status, 10);
    this.props.onClick(newStatus);
  }

  render() {
    const {status, className, disabled} = this.props;

    return (
      <span className={className}>
        <IconButton icon={<SvgIcon svg={up} />} data-status="1" disabled={status === 1 || disabled} onClick={this.changeStatus} />
        <IconButton icon={<SvgIcon svg={down} />} data-status="2" disabled={status === 2 || disabled} onClick={this.changeStatus} />
      </span>
    );
  }
}