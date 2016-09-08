import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import holdsport from 'utils/holdsport';
import {getUser} from 'utils/user';
import Loader from 'components/Loader';
import search from '../../images/magnify.svg';
import H1 from 'components/H1';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import styles from './PlayerList.css';
import Player from './Player';
import playerList from '../../utils/playerlist';

export default class Players extends Component {

  state = {
    players: null,
    filtered: null,
    fetching: false
  }

  componentDidMount() {
    this.getPlayerList();
  }

  getPlayerList() {
    this.setState({fetching: true});
    if (playerList.getPlayers()) {
      this.updateList(playerList.getPlayers());
      this.setState({fetching: false});
      return;
    }

    holdsport.get('members').then((response) => {
      this.updateList(response);
      playerList.savePlayers(response);
    });
  }


  getAllEmails() {
    let emails = '';
    const myEmail = getUser().addresses[0].email;
    emails = emails.concat(this.state.players.map((player) =>
      (myEmail !== player.addresses[0].email ? player.addresses[0].email : null)
    ));
    return emails;
  }

  updateList(response) {
    this.setState({
      players: response,
      filtered: response,
      fetching: false
    });
  }

  filterList = () => {
    const query = this.refs.search.input.value;

    const filtered = this.state.players.filter((player) => `${player.firstname}${player.lastname}`.toLowerCase().indexOf(query.toLowerCase()) > -1);
    this.setState({
      filtered
    });
  }

  render() {
    const inputStyle = {
      flex: '1 1 auto',
      width: 'auto'
    };

    return (
      <div>
        <H1>Spillere</H1>
        {this.state.fetching ? <Loader centered /> : null}
        {this.state.filtered ?
          <div className={styles.search}>
            <SvgIcon className={styles.searchIcon} width="20px" svg={search} />
            <TextField underlineShow={false} style={inputStyle} ref="search" onChange={this.filterList} floatingLabelText="Søg efter spiller" />
            <a className={styles.allMail} href={`mailto:${this.getAllEmails()}`}>Mail alle</a>
          </div> : null}
        {this.state.filtered ?
          <div className={styles.list}>
            {this.state.filtered.map((player, index) =>
              <div key={index}>
                <Player player={player} />
              </div>)}
          </div>
          : null}
      </div>
    );
  }
}
