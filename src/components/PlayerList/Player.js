import React, {PropTypes} from 'react';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import styles from './PlayerList.css';
import account from '../../images/account.svg';
import accountCoach from '../../images/account-star-variant.svg';
import email from '../../images/email.svg';
import phone from '../../images/cellphone-iphone.svg';
import card from '../../images/account-card-details.svg';
import {Card, CardText} from 'material-ui/Card';

function Player({player}) {
  return (
    <Card className={styles.player} >
      <CardText>
        <div>
          <SvgIcon width="18px" className={styles.icon} svg={player.role === 2 ? accountCoach : account} />
          <span className={styles.name}>{`${player.firstname} ${player.lastname}`}</span>
          {player.member_number !== '' ?
            <span className={styles.licens}>
              <SvgIcon width="18px" className={styles.icon} svg={card} />
              <span>{player.member_number}</span>
            </span>
            : null}
        </div>

        <div>
          <SvgIcon width="18px" className={styles.icon} svg={email} />
          <a href={`mailto:${player.addresses[0].email}`}>{player.addresses[0].email}</a>
        </div>

        {player.addresses[0].mobile !== '' ?
          <div>
            <SvgIcon width="18px" className={styles.icon} svg={phone} />
            <a href={`tel:${player.addresses[0].mobile}`}>{player.addresses[0].mobile}</a>
          </div>
        : null}
      </CardText>
    </Card>
  );
}

Player.propTypes = {
  player: PropTypes.object
};

export default Player;