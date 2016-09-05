import React, {Component, PropTypes} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import Loader from 'components/Loader';
import H1 from 'components/H1';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import styles from './ProfileEdit.css';
// import edit from '../../images/pencil.svg';
import email from '../../images/email.svg';
import phone from '../../images/cellphone-iphone.svg';
import location from '../../images/map-marker.svg';
import SvgIcon from 'components/SvgIcon/SvgIcon';

export default class Profile extends Component {
  static propTypes = {
    onEdit: PropTypes.func,
    user: PropTypes.object
  }

  getAvatar() {
    const {profile_picture_path: path} = this.props.user;
    let node = null;
    if (path !== '') {
      node = (<Avatar src={path} />);
    } else {
      node = (<Avatar icon={<Person />} />);
    }
    return node;
  }


  render() {
    const {user} = this.props;
    const info = user ? user.addresses[0] : null;

    return (
      <div>
        <H1>Profil</H1>
        {!user ? <Loader centered /> : null}
        {user ?
          <Card className={styles.profile}>
            <CardHeader avatar={this.getAvatar()} title={`${user.firstname} ${user.lastname}`} />
            <CardText>
              <p><SvgIcon svg={email} />{info.email}</p>
              <p><SvgIcon svg={phone} />{info.mobile}</p>
              <p><SvgIcon svg={location} />{info.street}</p>
              <p>{`${info.postcode} ${info.city}`}</p>
            </CardText>
            {/* <CardActions>
              <FlatButton label="Rediger" icon={<SvgIcon svg={edit} />} onClick={this.props.onEdit} />
            </CardActions>*/}
          </Card>
          : null}
      </div>
    );
  }
}