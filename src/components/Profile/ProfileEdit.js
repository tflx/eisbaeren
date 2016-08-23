import React, {Component} from 'react';
import {getUser} from 'utils/user';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Loader from 'components/Loader';
import H1 from 'components/H1';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';

export default class ProfileEdit extends Component {

  state = {

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
          <Card>
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
      </div>
    );
  }
}