import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import holdsport from 'utils/holdsport';
import * as date from 'utils/date';
import styles from './Comments.css';

export default class Comment extends Component {
  static propTypes = {
    activity: PropTypes.object
  }

  state = {
    fetching: false
  };


  saveComment = () => {
    const path = `/v1/activities/${this.props.activity.id}/comments`;
    const data = this.refs.comment.getValue();
    return;
    holdsport.push(path, data, 'PUSH')
    .then((response => console.log(response)));
  }

  renderComments() {
    const {comments} = this.props.activity;
    if (!comments.length) return (<div />);

    const list = [];

    list.push(comments.map((item, index) => {
      const parsedDate = date.parseDate(item.created_at);
      return (
        <li key={index}>
          <p>{item.name}<span>{parsedDate.convertedDate} - {parsedDate.time}</span></p>
          <p>{item.comment}</p>
        </li>
      );
    }
    ));
    return list;
  }


  render() {
    const {comments} = this.props.activity;

    return (
      <div>
        {comments ?
          <div className={styles.comments}>
            <ul>
              {this.renderComments()}
            </ul>
          </div>
          : null
        }

        <TextField ref="comment" floatingLabelText="Kommentar" multiLine rows={2} />
        <RaisedButton label="Gem" onClick={this.saveComment} />
      </div>
    );
  }
}