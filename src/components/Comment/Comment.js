import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import holdsport from 'utils/holdsport';
import styles from './Comments.css';
import DateString from 'components/DateString';

export default class Comment extends Component {
  static propTypes = {
    activity: PropTypes.object,
    reloadActivity: PropTypes.func,
  }

  state = {
    inputFocus: false,
    newComment: ''
  };


  onInputFocus = () => {
    this.setState({inputFocus: true});
  }

  onInputFocusOut = () => {
    setTimeout(() =>
      this.setState({inputFocus: false}), 100
    );
  }

  onCommentInput = () => {
    this.setState({newComment: this.refs.comment.getValue()});
  }


  saveComment = () => {
    const path = `/v1/activities/${this.props.activity.id}/comments`;
    const data = {comment: {body: this.state.newComment}};
    holdsport.push(path, data, 'PUSH')
      .then((response => {
        console.log(response);
        this.setState({newComment: ''});
        this.props.reloadActivity();
      }
    ));
  }


  renderComments() {
    const {comments} = this.props.activity;
    if (!comments.length) return (<div />);

    const list = [];

    list.push(comments.map((item, index) =>
      <li key={index}>
        <div className={styles.commentHeader}>
          <span className={styles.commentName}>{item.name}</span>
          <span className={styles.commentDate}><DateString date={item.created_at} parenthesis={false} /></span>
        </div>
        <p className={styles.quote}><span>”</span>{item.comment}</p>
      </li>
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
          value={this.state.newComment}
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