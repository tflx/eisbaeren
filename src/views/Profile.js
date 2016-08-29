import React, {PropTypes} from 'react';
import ProfileEdit from 'components/Profile/ProfileEdit';

function Profile({...props}) {
  return (
    <ProfileEdit {...props} />
  );
}

Profile.propTypes = {
  onLogOut: PropTypes.func
};

export default Profile;