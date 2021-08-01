import React, { useEffect, useState } from 'react';
import db from './firebase-config';
import firebase from 'firebase';
import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
} from '@material-ui/icons';
import {
  Button,
  TextField,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from '@material-ui/core';

export default function App() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [updateFirstName, setUpdateFirstName] = useState('');
  const [updateLastName, setUpdateLastName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [toUpdateId, setToUpdateId] = useState('');

  console.log(users);

  useEffect(() => {
    db.collection('users')
      .orderBy('datetime', 'desc')
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              firstname: doc.data().firstname,
              lastname: doc.data().lastname,
              email: doc.data().email,
              message: doc.data().message,
              datetime: doc.data().datetime,
            };
          })
        );
      });
  }, []);

  function addUser(event) {
    event.preventDefault();
    db.collection('users').add({
      firstname: firstName,
      lastname: lastName,
      email: email,
      message: message,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
  }

  function deleteUser(id) {
    db.collection('users').doc(id).delete();
  }

  function openUpdateDialog(user) {
    setOpen(true);
    setToUpdateId(user.id);
    setUpdateFirstName(user.firstname);
    setUpdateLastName(user.lastname);
    setUpdateEmail(user.email);
    setUpdateMessage(user.message);
  }

  function editUser() {
    db.collection('users').doc(toUpdateId).update({
      firstname: updateFirstName,
      lastname: updateLastName,
      email: updateEmail,
      message: updateMessage,
    });
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Container maxWidth="sm">
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="First Name"
          name="firstname"
          autoFocus
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastname"
          label="Last Name"
          name="lastname"
          autoFocus
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoFocus
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          multiline
          rows={10}
          required
          fullWidth
          id="message"
          label="Message"
          name="message"
          autoFocus
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addUser}
          disabled={!firstName || !lastName || !email || !message}
          startIcon={<AddCircleOutlineRounded />}
        >
          Submit
        </Button>
      </form>

      <h1>User Comments</h1>
      <List dense={true}>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography>
                    <strong>{`${user.firstname} ${user.lastname}`}</strong>
                  </Typography>
                  {` - ${user.message}`}
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Edit"
                onClick={() => openUpdateDialog(user)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteUser(user.id)}
              >
                <DeleteOutlineRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Update First Name"
            type="text"
            fullWidth
            name="updateUserFirstName"
            value={updateFirstName}
            onChange={(event) => setUpdateFirstName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="normal"
            label="Update Last Name"
            type="text"
            fullWidth
            name="updateUserLastName"
            value={updateLastName}
            onChange={(event) => setUpdateLastName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="normal"
            label="Update Email"
            type="text"
            fullWidth
            name="updateUserEmail"
            value={updateEmail}
            onChange={(event) => setUpdateEmail(event.target.value)}
          />
          <TextField
            autoFocus
            margin="normal"
            label="Update Message"
            type="text"
            fullWidth
            name="updateUserMessage"
            value={updateMessage}
            onChange={(event) => setUpdateMessage(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
