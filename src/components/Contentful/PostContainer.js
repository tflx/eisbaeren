import React, {Component, PropTypes} from 'react';
import config from '../../../mock-api/config.json';
import Post from './Post';
import Loader from 'components/Loader';

export default class PostContainer extends Component {
  static propTypes = {
    postId: PropTypes.string,
  };

  state = {
    post: null,
    fetching: true,
  };

  componentDidMount() {
    const url = `${config.contentful.api}/spaces/${config.contentful.spaceId}/entries/${this.props.postId}?access_token=${config.contentful.productionApi}`;

    fetch(url)
    .then((response) => response.json()
    .then((json) => {
      this.setState({post: json, fetching: false});
    }));
  }

  render() {
    return (
      <div>
        {this.state.fetching ?
          <Loader centered />
          :
          <Post post={this.state.post} />
        }
      </div>
    );
  }
}