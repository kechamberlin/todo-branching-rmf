import db from './firebase-config';
import firebase from 'firebase';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { Button, TextField, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  useEffect(() => {
    db.collection('users')
      .orderBy('lastname', 'asc')
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              firstname: doc.data().firstname,
              lastname: doc.data().lastname,
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
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFirstName('');
    setLastName('');
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addUser}
          disabled={!firstName || !lastName}
          startIcon={<AddCircleOutlineRounded />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
