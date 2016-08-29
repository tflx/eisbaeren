import React, {Component, PropTypes} from 'react';
import ActivityList from 'components/ActivityList/ActivityList';
import Login from 'components/Login/Login';

export default class IndexView extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool
  }

  render() {
    return (
      <div>
        {this.props.isLoggedIn ? <ActivityList /> : <Login {...this.props} />}
      </div>
    );
  }
}