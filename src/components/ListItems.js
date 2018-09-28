import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Chat, 
        Today,
        FitnessCenter,
        Dashboard } from '@material-ui/icons/';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Chat />
      </ListItemIcon>
      <ListItemText primary="Chat" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Today />
      </ListItemIcon>
      <ListItemText primary="Calendario" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FitnessCenter />
      </ListItemIcon>
      <ListItemText primary="Entreno" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader>Funcionalidades Admin</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>
  </div>
);