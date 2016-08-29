import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import holdsport from 'utils/holdsport';
import {getUser} from 'utils/user';
import Loader from 'components/Loader';
// import Person from 'material-ui/svg-icons/social/person';
import search from '../../images/magnify.svg';
import account from '../../images/account.svg';
import accountCoach from '../../images/account-star-variant.svg';
import email from '../../images/email.svg';
import phone from '../../images/cellphone-iphone.svg';
import card from '../../images/account-card-details.svg';
import H1 from 'components/H1';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import styles from './PlayerList.css';

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
    holdsport.get('members').then((response) => {
      this.setState({
        players: response,
        filtered: response,
        fetching: false
      });
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
                <div className={styles.player} >

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
                </div>
                <Divider />
              </div>)}
          </div>
          : null}
      </div>
    );
  }
}
