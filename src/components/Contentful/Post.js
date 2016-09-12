import React, {PropTypes} from 'react';
import {Card, CardText} from 'material-ui/Card';
import marked from 'marked';
import H1 from 'components/H1';
import styles from './Post.css';

function Post({...props}) {
  const {body, title} = props.post.fields;
  const markdown = {__html: marked(body)};

  return (
    <div>
      <H1>{title}</H1>
      <Card>
        <CardText className={styles.markdown}>
          <p dangerouslySetInnerHTML={markdown}></p>
        </CardText>
      </Card>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;