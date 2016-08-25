import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Loader from 'components/Loader';
import {get} from 'utils/holdsport';
import card from '../../images/account-card-details.svg';
import SvgIcon from 'components/SvgIcon/SvgIcon';

export default class GameCard extends Component {
  static propTypes = {
    attending: PropTypes.array
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


    get('members').then((response) => {
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

  render() {
    const actions = [<FlatButton label="Luk"onTouchTap={this.handleClose} />];
    const attending = this.state.attending;

    return (
      <div>
        <RaisedButton label="Kampkort" onTouchTap={this.handleOpen} />
        <Dialog title="Kampkort"actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
          {attending ?
            <div>
              <div>Navn<span><SvgIcon svg={card} /></span></div>
              <div>
                {attending.map((player, index) =>
                  <p key={index}>{player.firstname} {player.lastname}<span>{player.member_number}</span></p>
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