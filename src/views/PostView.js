import React, {PropTypes} from 'react';
import Post from 'components/Contentful/Post';

function PostView({...props}) {
  return (
    <Post postId={props.params.postId} />
  );
}

PostView.propTypes = {
  params: PropTypes.object
};

export default PostView;