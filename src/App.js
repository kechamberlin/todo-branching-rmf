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
    <div>
      <h1>Start here!</h1>
    </div>
  );
}
