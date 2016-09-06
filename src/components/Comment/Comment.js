import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import holdsport from 'utils/holdsport';
import * as date from 'utils/date';
import styles from './Comments.css';
import Subheader from 'material-ui/Subheader';

export default class Comment extends Component {
  static propTypes = {
    activity: PropTypes.object
  }

  state = {
    fetching: false,
    inputFocus: false,
    newComment: ''
  };


  onInputFocus = () => {
    this.setState({inputFocus: true});
  }

  onInputFocusOut = () => {
    this.setState({inputFocus: false});
  }

  onCommentInput = () => {
    this.setState({newComment: this.refs.comment.getValue()});
  }


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
          <div className={styles.commentHeader}>
            <span className={styles.commentName}>{item.name}</span>
            <span className={styles.commentDate}>({parsedDate.convertedDate} - {parsedDate.time})</span>
          </div>
          <p className={styles.quote}><span>”</span>{item.comment}</p>
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
          <div>
            <ul className={styles.comments}>
              {this.renderComments()}
            </ul>
          </div>
          : null
        }
        <TextField
          onFocus={this.onInputFocus}
          onBlur={this.onInputFocusOut}
          onChange={this.onCommentInput}
          ref="comment"
          floatingLabelText="Skriv ny kommentar:"
          multiLine
          rows={1}
          underlineShow
          fullWidth
        />
        <RaisedButton
          disabled={!this.state.inputFocus || this.state.newComment === ''}
          className={this.state.inputFocus ? styles.inputFocus : styles.inputBlur}
          label="Gem kommentar"
          onClick={this.saveComment}
        />
      </div>
    );
  }
}