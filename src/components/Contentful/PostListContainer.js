import React, {Component} from 'react';
import config from '../../../mock-api/config.json';
import PostList from './PostList';
import Loader from 'components/Loader';

export default class PostListContainer extends Component {

  state = {
    posts: null,
    fetching: true,
  };

  componentDidMount() {
    const url = `${config.contentful.api}/spaces/${config.contentful.spaceId}/entries?access_token=${config.contentful.productionApi}&content_type=${config.contentful.posts}`;

    fetch(url)
    .then((response) => response.json()
    .then((json) => {
      this.setState({posts: json.items, fetching: false});
    }));
  }

  render() {
    return (
      <div>
        {this.state.fetching ?
          <Loader centered />
          :
          <PostList posts={this.state.posts} />
        }
      </div>
    );
  }
}