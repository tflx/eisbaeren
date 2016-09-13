import React, {Component, PropTypes} from 'react';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import up from '../../images/thumb-up.svg';
import down from '../../images/thumb-down.svg';
import IconButton from 'components/IconButton';
import holdsport from 'utils/holdsport';

export default class Status extends Component {
  static propTypes = {
    className: PropTypes.string,
    status: PropTypes.number,
    disabled: PropTypes.bool,
    actionMethod: PropTypes.string,
    actionPath: PropTypes.string,
    reloadActivity: PropTypes.func,
  }

  changeStatus = (event) => {
    const newStatus = parseInt(event.currentTarget.dataset.status, 10);
    // this.props.onClick(newStatus);

    const data = {
      activities_user: {
        joined_status: newStatus,
        picked: 1
      }
    };

    const {actionMethod, actionPath} = this.props;
    holdsport.push(actionPath, data, actionMethod)
      .then((response) => {
        this.props.reloadActivity(response.status_code);
      });
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