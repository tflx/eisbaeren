import React, {PropTypes} from 'react';
import PostContainer from 'components/Contentful/PostContainer';

function PostView({...props}) {
  return (
    <PostContainer postId={props.params.postId} />
  );
}

PostView.propTypes = {
  params: PropTypes.object
};

export default PostView;