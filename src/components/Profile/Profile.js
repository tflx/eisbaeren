import React, {Component, PropTypes} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import Loader from 'components/Loader';
import H1 from 'components/H1';
import Avatar from 'material-ui/Avatar';
import styles from './ProfileEdit.css';
// import edit from '../../images/pencil.svg';
import email from '../../images/email.svg';
import phone from '../../images/cellphone-iphone.svg';
import location from '../../images/map-marker.svg';
import account from '../../images/account.svg';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import config from '../../../mock-api/config.json';
import IconAndText from 'components/IconAndText';

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
      node = (<Avatar className={styles.avatar} backgroundColor={config.colors.primary} icon={<SvgIcon svg={account} />} />);
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
            <div className={styles.header}>
              <IconAndText color="white" size="20px" ellipsis icon={this.getAvatar()} text={`${user.firstname} ${user.lastname}`} />
            </div>
            <CardText>
              <div className={styles.info}>
                <IconAndText ellipsis icon={<SvgIcon svg={email} />} text={info.email} />
                <IconAndText ellipsis icon={<SvgIcon svg={phone} />} text={info.mobile} />
                <IconAndText ellipsis icon={<SvgIcon svg={location} />} text={info.street} />
                <span className={styles.zipCity}>{`${info.postcode} ${info.city}`}</span>
              </div>
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