import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import DateString from 'components/DateString';
import IconButton from 'components/IconButton';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import arrow from '../../images/arrow-right.svg';

function PostEntry({...props}) {
  const {title, date, id} = props;


  function showPost() {
    browserHistory.push(`/info/id/${id}`);
  }

  return (
    <Card>
      <CardHeader title={title} subtitle={<DateString date={date} parenthesis={false} />}/>
      <CardActions>
        <IconButton onClick={showPost} icon={<SvgIcon width="24px" svg={arrow} />} />
      </CardActions>
    </Card>
  );
}

PostEntry.propTypes = {
  author: PropTypes.array,
  title: PropTypes.string,
  category: PropTypes.object,
  date: PropTypes.string,
  id: PropTypes.string,
};

export default PostEntry;