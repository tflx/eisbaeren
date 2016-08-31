import React, {Component, PropTypes} from 'react';
import ProfileEdit from 'components/Profile/ProfileEdit';
import Profile from 'components/Profile/Profile';
import RaisedButton from 'material-ui/RaisedButton';
import config from '../../mock-api/config.json';
import {getUser, saveUser} from 'utils/user';
import holdsport from 'utils/holdsport';


export default class ProfileView extends Component {
  static propTypes = {
    onLogOut: PropTypes.func
  }

  state = {
    editing: false
  };

  onLogout = () => {
    this.props.onLogOut();
  }

  onEdit = () => {
    this.setState({editing: true});
  }

  onSaveChanges = (user) => {
    const path = '/v1/user';
    const method = 'PUT';
    const data = user;
    console.log(user);

    holdsport.push(path, data, method)
    .then((response) => {
      console.log(response);
      this.setState({editing: false});

      holdsport.get()
      .then(json =>
        console.log(json)
      );
    });
  }

  render() {
    const user = getUser();
    return (
      <div>
        {/* this.state.editing ?
          <ProfileEdit user={user} onSaveChanges={this.onSaveChanges} />
          : <Profile user={user} onEdit={this.onEdit} />
        */}
        <Profile user={user} />
        <RaisedButton labelColor="white" backgroundColor={config.colors.primary} label="Log ud" fullWidth onClick={this.onLogout} />
      </div>
    );
  }
}