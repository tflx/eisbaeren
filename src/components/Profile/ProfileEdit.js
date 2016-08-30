import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Loader from 'components/Loader';
import H1 from 'components/H1';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import styles from './ProfileEdit.css';
import email from '../../images/email.svg';
import phone from '../../images/cellphone-iphone.svg';
import location from '../../images/map-marker.svg';
import save from '../../images/content-save.svg';
import SvgIcon from 'components/SvgIcon/SvgIcon';

export default class ProfileEdit extends Component {
  static propTypes = {
    onSaveChanges: PropTypes.func,
    user: PropTypes.object
  }


  onSave = () => {
    const formData = {
      user: {
        firstname: this.props.user.firstname,
        lastname: this.props.user.lastname,
        addresses: [
          {
            street: this.refs.street.getValue(),
            mobile: this.refs.mobile.getValue(),
            postcode: this.refs.postcode.getValue(),
            city: this.refs.city.getValue(),
            email: this.refs.email.getValue(),
          }
        ]
      }
    };
    // const data = {...this.props.user, ...formData};
    this.props.onSaveChanges(formData);
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
              <SvgIcon svg={email} /><TextField ref="email" name="email" defaultValue={info.email} />
              <SvgIcon svg={phone} /><TextField ref="mobile" name="phone" defaultValue={info.mobile} />
              <SvgIcon svg={location} /><TextField ref="street" name="street" defaultValue={info.street} />
              <TextField ref="postcode" style={{width: '40px'}} maxLength="4" name="postcode" defaultValue={info.postcode} />
              <TextField ref="city" name="city" defaultValue={info.city} />
            </CardText>
            <CardActions>
              <FlatButton icon={<SvgIcon svg={save} />} label="Gem" onClick={this.onSave} />
            </CardActions>
          </Card>
          : null}
      </div>
    );
  }
}