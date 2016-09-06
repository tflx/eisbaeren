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

  handleOpen = () => {
    this.setState({open: true});
    if (!this.state.attending) this.mapPlayers();
  };

  handleClose = () => {
    this.setState({open: false});
  };

  mapPlayers() {
    const {attending} = this.props;
    let players = [];
    const mapped = [];


    holdsport.get('members').then((response) => {
      players = response;

      for (const attendingPlayer of attending) {
        mapped.push(
          players.find((player) => (
            player.id === attendingPlayer.user_id)
          )
        );
      }
      this.setState({attending: mapped});
    });
  }

  parseStarttime() {
  }

  parseGameNo() {
    return this.props.comment.match(/kamp nr. (\d+(\.\d)*)/i)[1];
  }

  render() {
    const actions = [<FlatButton label="Luk"onTouchTap={this.handleClose} />];
    const attending = this.state.attending;

    return (
      <div>
        <RaisedButton label="Kampkort" onTouchTap={this.handleOpen} />
        <Dialog title="Kampkort" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent>
          {attending ?
            <div>
              <div className={styles.gameInfo}>
                <div>Række: <strong>{config.dai.league}</strong>, Pulje: <strong>{config.dai.division}</strong></div>
                <div>Kamp nr. <strong>{this.parseGameNo()}</strong></div>
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