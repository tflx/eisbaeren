import React, {PropTypes} from 'react';
import {Card, CardText, CardHeader} from 'material-ui/Card';

function Post({...props}) {
  return (
    <Card>
      <CardHeader title={props.title} />
      <CardText>
        <p>{props.body}</p>
      </CardText>
    </Card>
  );
}

Post.propTypes = {
  body: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
};

export default Post;