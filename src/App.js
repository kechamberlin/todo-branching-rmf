import db from './firebase-config';
import firebase from 'firebase';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { Button, TextField, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  return (
    <div>
      <h1>Start here!</h1>
    </div>
  );
}
