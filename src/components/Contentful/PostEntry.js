import React, {PropTypes} from 'react';
import {Card, CardText, CardHeader} from 'material-ui/Card';

function PostEntry({...props}) {
  const {author, title} = props;

  return (
    <Card>
      <CardHeader title={title} />
      <CardActions>

      </CardActions>
    </Card>
  );
}

PostEntry.propTypes = {
  author: PropTypes.array,
  title: PropTypes.string,
  category: PropTypes.object,
};

export default PostEntry;