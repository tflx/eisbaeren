import React, {Component, PropTypes} from 'react';
import playerList from 'utils/playerlist';
import holdsport from 'utils/holdsport';
import utils from 'utils/utils';
import RaisedButton from 'material-ui/RaisedButton';
import * as dateUtil from 'utils/date';
import styles from './GameMail.css';

export default class GameMail extends Component {
  static propTypes = {
    starttime: PropTypes.string,
    name: PropTypes.string,
    place: PropTypes.string,
    attending: PropTypes.array,
  }

  state = {
    addresses: null
  };

  componentWillMount() {
    let players = null;
    if (playerList.getPlayers()) {
      players = playerList.getPlayers();
      this.setState({addresses: utils.getAllEmails(players)});
    } else {
      holdsport.get('members').then((response) => {
        players = response;
        playerList.savePlayers(response);
        this.setState({addresses: utils.getAllEmails(players)});
      });
    }
  }

  renderPlayerList() {
    let list = '';
    for (const player of this.props.attending) {
      list += `${player.name}%0D%0A`;
    }
    return list;
  }

  render() {
    const {name, place, starttime} = this.props;
    const mailto = this.state.addresses;
    const date = dateUtil.parseDate(starttime);
    const dateString = `${date.day}/${date.convertedDate} kl.${date.time}, ${place}`;
    const subject = `Kampindkaldelse - ${dateString}`;

    const newLine = '%0D%0A';
    const body = `${name}${newLine}${dateString}${newLine}${newLine}${newLine}Tilmeldte spillere:${newLine}${this.renderPlayerList()}`;

    return (
      <div>
        {this.state.addresses ?
          <div className={styles.buttonWrap}>
            <a className={styles.mailto} href={`mailto:${mailto}?subject=${subject}&body=${body}`} />
            <RaisedButton  label="Indkaldelse" />
          </div>
          : null}
      </div>
    );
  }
}