import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Chat, 
        Today,
        FitnessCenter,
        Dashboard } from '@material-ui/icons/';

import constants from '../../constants'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Chat />
      </ListItemIcon>
      <ListItemText primary={constants.chat} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Today />
      </ListItemIcon>
      <ListItemText primary={constants.calendar} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FitnessCenter />
      </ListItemIcon>
      <ListItemText primary={constants.training} />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary={constants.admin} />
    </ListItem>
  </div>
);