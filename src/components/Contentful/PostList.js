import React, {PropTypes} from 'react';
import PostEntry from './PostEntry';
import H1 from 'components/H1';

function PostList({...props}) {
  const {posts} = props;


  return (
    <div>
      <H1>Info</H1>
      {posts.length ?
        posts.map((post, index) =>
          <PostEntry
            key={index}
            author={post.fields.author}
            title={post.fields.title}
            date={post.sys.createdAt}
            id={post.sys.id}
          />
        )
        :
        null
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array
};

export default PostList;