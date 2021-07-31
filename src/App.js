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
              datatime: doc.data().datatime,
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
    </Container>
  );
}
