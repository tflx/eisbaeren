import React, {PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as date from 'utils/date';

function Rsvps({...props}) {
  const {activityUsers} = props;
  const attends = [];
  const noAttend = [];
  const noRsvp = [];

  for (const user of activityUsers) {
    switch (user.status_code) {
      case 1: attends.push(user);
        break;
      case 2: noAttend.push(user);
        break;
      case 0: noRsvp.push(user);
        break;
      default:
        break;
    }
  }

  function renderList(list) {
    const users = [];
    users.push(list.map((user, index) => {
      const d = date.parseDate(user.updated_at);
      return (<li key={index}>{user.name} - <span>({d.convertedDate} - {d.time})</span></li>);
    }));
    return users;
  }

  return (
    <div>
      <Tabs>
        <Tab label="Tilmeldt">
          {attends.length ? <ul> {renderList(attends)} </ul> : null}
        </Tab>

        <Tab label="Afmeldt">
          {noAttend.length ? <ul> {renderList(noAttend)} </ul> : null}
        </Tab>

        <Tab label="Mangler">
          {noRsvp.length ? <ul> {renderList(noRsvp)} </ul> : null}
        </Tab>
      </Tabs>
    </div>
  );
}

Rsvps.propTypes = {
  activityUsers: PropTypes.array
};

export default Rsvps;