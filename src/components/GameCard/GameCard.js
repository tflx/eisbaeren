import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Loader from 'components/Loader';
import holdsport from 'utils/holdsport';
import card from '../../images/account-card-details.svg';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import config from '../../../mock-api/config.json';
import styles from './GameCard.css';
import playerList from '../../utils/playerlist';
import DateString from 'components/DateString';
import * as dateUtil from 'utils/date';

export default class GameCard extends Component {
  static propTypes = {
    attending: PropTypes.array,
    starttime: PropTypes.string,
    comment: PropTypes.string
  }

  state = {
    open: false,
    attending: null
  };

  getPlayers() {
    if (playerList.getPlayers()) {
      this.mapPlayers(playerList.getPlayers());
    } else {
      holdsport.get('members').then((response) => {
        playerList.savePlayers(response);
        this.mapPlayers(playerList.getPlayers());
      });
    }
  }

  handleOpen = () => {
    this.setState({open: true});
    if (!this.state.attending) this.getPlayers();
  };

  handleClose = () => {
    this.setState({open: false});
  };


  mapPlayers(list) {
    const {attending} = this.props;
    const mapped = [];

    for (const attendingPlayer of attending) {
      mapped.push(
        list.find((player) => (
          player.id === attendingPlayer.user_id)
        )
      );
    }
    this.setState({attending: mapped});
  }

  parseStarttime() {
  }

  parseGameNo() {
    return this.props.comment.match(/kamp nr. (\d+(\.\d)*)/i)[1];
  }

  render() {
    const actions = [<FlatButton label="Luk"onTouchTap={this.handleClose} />];
    const attending = this.state.attending;
    const kickoff = dateUtil.parseDate(this.props.starttime).kickoff;

    return (
      <div>
        <RaisedButton label="Kampkort" onClick={this.handleOpen} />
        <Dialog title="Kampkort" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent>
          {attending ?
            <div>
              <div className={styles.gameInfo}>
                <span>Dato: </span>
                <DateString
                  className={styles.highlight}
                  size="14px"
                  time={false}
                  date={this.props.starttime}
                  parenthesis={false}
                />
                <span className={styles.highlight}> kl. {kickoff}</span>
                <div>Række: <span className={styles.highlight}>{config.dai.league}</span>, Pulje: <span className={styles.highlight}>{config.dai.division}</span></div>
                <div>Kamp nr. <span className={styles.highlight}>{this.parseGameNo()}</span></div>
              </div>

              <div className={styles.players}>
                <div className={styles.header}><p>Spiller</p><span><SvgIcon svg={card} /></span></div>
                {attending.map((player, index) =>
                  <div key={index}><p>{player.firstname} {player.lastname}</p><p>{player.member_number}</p></div>
                )}
              </div>
            </div>
            : <Loader centered />
          }
        </Dialog>
      </div>
    );
  }
}