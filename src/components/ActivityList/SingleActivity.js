import React, {Component, PropTypes} from 'react';
import {push} from 'utils/holdsport';
import {browserHistory} from 'react-router';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import soccer from '../../images/soccer.svg';
import star from '../../images/star-circle.svg';
import arrow from '../../images/arrow-right.svg';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import * as dateUtil from '../../utils/date';
import styles from './Activities.css';
import Loader from 'components/Loader';
import Status from 'components/Status/Status';

export default class SingleActivity extends Component {
  static propTypes = {
    activity: PropTypes.object
  }

  state = {
    fetching: false,
    status: null
  };

  componentWillMount() {
    const {status} = this.props.activity;
    this.setState({status});
  }

  getStatusIcon() {
    const node = <span className={styles.infoIcon} />;
    return node;
  }

  changeStatus = (newStatus) => {
    this.setState({fetching: true});
    const data = {
      activities_user: {
        joined_status: newStatus,
        picked: 1
      }
    };

    const {action_method, action_path} = this.state.activity;
    push(action_path, data, action_method)
      .then((response) =>
        this.setState({status: response.status_code, fetching: false})
      );
  }

  showDetails = () => {
    const {activity} = this.props;
    browserHistory.push(`/activities/${activity.id}`);
  }

  render() {
    const {activity} = this.props;
    const showTime = activity.event_type_id === 1;
    const {time, convertedDate, kickoff} = dateUtil.parseDate(activity.starttime, showTime);
    const eventIcon = activity.event_type_id === 1 ? soccer : star;


    const iconStyle = {
      width: '16px',
      height: '16px',
    };
    const iconStyleBig = {
      width: '22px',
      height: '22px'
    };

    const cardStyle = {
      paddingBottom: 0,
    };

    const loaderStyle = {
      width: '32px',
      height: '32px',
      left: '-16px',
      top: '-7px'
    };

    const detailsButtonStyle = {
      border: '1px solid lightgrey',
      boxShadow: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      padding: '0',
    };

    const arrowButtonStyle = {
      width: '46px',
      height: '46px',
    };


    return (
      <Card containerStyle={cardStyle}>
        <CardText>
          <div>

            <div>
              <div className={styles.info}>
                {/* <SvgIcon svg={eventIcon} style={iconStyleBig} className={styles.infoIcon} />*/}
                <span className={styles.infoText}>{activity.name}</span>
              </div>
              <div className={styles.subInfo}>
                {/* <span style={iconStyle} className={styles.infoIcon} />*/}
                <span className={styles.infoText}>{`${convertedDate} - ${time} (${kickoff})`}</span>
              </div>
              <div className={styles.subInfo}>
                {/* <span style={iconStyle} className={styles.infoIcon} />*/}
                <span className={styles.infoText}>{activity.place}</span>
              </div>
            </div>

            <div className={styles.actions}>
              {this.state.fetching ? <Loader size={0.3} className={styles.infoIcon} style={loaderStyle} /> : this.getStatusIcon()}
              <Status status={this.state.status} disabled={this.state.fetching} className={styles.status} onClick={this.changeStatus} />
              <span className={styles.details}>
                <IconButton onClick={this.showDetails} style={detailsButtonStyle}>
                  <SvgIcon svg={arrow} width="24px" />
                </IconButton>
              </span>
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}