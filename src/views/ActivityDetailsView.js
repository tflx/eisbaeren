import React, {PropTypes} from 'react';
import ActivityDetails from 'components/ActivityDetails/ActivityDetails';

function ActivityDetailsView({...props}) {
  return (
    <ActivityDetails eventId={props.params.eventId} />
  );
}

ActivityDetailsView.propTypes = {
  params: PropTypes.object
};

export default ActivityDetailsView;