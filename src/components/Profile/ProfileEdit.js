import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {getUser} from 'utils/user';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from 'components/Loader';
import H1 from 'components/H1';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import styles from './ProfileEdit.css';
import config from '../../../mock-api/config.json';

export default class ProfileEdit extends Component {
  static propTypes = {
    onLogOut: PropTypes.func
  }

  onLogout = () => {
    this.props.onLogOut();
    browserHistory.push('/');
  }

  getAvatar() {
    const {profile_picture_path: path} = getUser();
    let node = null;
    if (path !== '') {
      node = (<Avatar src={path} />);
    } else {
      node = (<Avatar icon={<Person />} />);
    }
    return node;
  }


  render() {
    const user = getUser() || null;
    const info = user ? user.addresses[0] : null;

    return (
      <div>
        <H1>Profil</H1>
        {!user ? <Loader centered /> : null}
        {user ?
          <Card className={styles.profile}>
            <CardHeader avatar={this.getAvatar()} title={`${user.firstname} ${user.lastname}`} />
            <CardText>
              <p>{info.email}</p>
              <p>{info.mobile}</p>
              <p>{info.street}</p>
              <p>{`${info.postcode} ${info.city}`}</p>
            </CardText>
            <CardActions>
              <FlatButton label="Rediger" />
            </CardActions>
          </Card>
          : null}
        <RaisedButton labelColor="white" backgroundColor={config.colors.primary} label="Log ud" fullWidth onClick={this.onLogout} />
      </div>
    );
  }
}