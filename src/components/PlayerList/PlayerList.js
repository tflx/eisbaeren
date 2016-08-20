import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {get} from 'utils/holdsport';
import Loader from 'components/Loader';
import Person from 'material-ui/svg-icons/social/person';
import Search from 'material-ui/svg-icons/action/search';
import H1 from 'components/H1';

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
    get('members').then((response) => {
      this.setState({
        players: response,
        filtered: response,
        fetching: false
      });
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
    return (
      <div>
        <H1>Spillere</H1>
        {this.state.fetching ? <Loader centered /> : null}
        {this.state.filtered ? <div><TextField ref="search" onChange={this.filterList} floatingLabelText="Søg" /></div> : null}
        {this.state.filtered ?
          <List>
            {this.state.filtered.map((player, index) =>
              <div key={index}>
                <ListItem leftIcon={<Person />}>
                  <p>{`${player.firstname} ${player.lastname}`}</p>
                  <a href={`mailto:${player.addresses[0].email}`}>{player.addresses[0].email}</a>
                  <a>{player.addresses[0].mobile}</a>
                </ListItem>
                <Divider inset />
              </div>)}
          </List>
          : null}
      </div>
    );
  }
}
