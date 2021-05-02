import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react'

import { List, Label, Grid, Button } from 'semantic-ui-react';

import { firestore } from './firebase';

function App() {

  const [list, setList] = useState([]);
  const [city, setCity] = useState('Delhi');

  const options = [
    { key: 1, text: 'Delhi', value: 'Delhi' },
    { key: 2, text: 'Jaipur', value: 'Jaipur' },
    { key: 3, text: 'Kanpur', value: 'Kanpur' },
    { key: 4, text: 'Mumbai', value: 'Mumbai' },
  ]

  const DropdownExampleDropdown = () => (
    <Dropdown
      options={options}
      placeholder='Choose a City'
      selection
      value={city}
      onChange={handleChange}
    />
  )

  const handleChange = (e, {value}) =>  { 
    setCity(value);
  }

  useEffect(() => {
    const initState = [];
    firestore
      .collection('leads')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          initState.push({
            date: doc.data().date,
            location: doc.data().location,
            text: doc.data().text
          });
        });
      })
      .finally(() => {
        setList(initState)
      })
  }, []);

  const formatList = () => {
    let filteredList = list.filter(e => e.location == city)
    return filteredList.map((e, i) => {
      return (
        <List.Item key={i}>
            <Grid verticalAlign="middle" textAlign="center" columns={3}>
              
              <Grid.Column width={4}>
                <Label basic color="red" size="small" horizontal>
                  {e.date}
                </Label>
              </Grid.Column>
              <Grid.Column width={4} textAlign="center">
                {e.location}
              </Grid.Column>
              <Grid.Column width={8} textAlign="center">
                {e.text}
              </Grid.Column>
            </Grid>
        </List.Item>
      );
    });
     
  }

  return (
    <div >
      <header >

        <h1>Get Resources for Covid (Twitter Crawl)</h1>
        

      </header>
      {DropdownExampleDropdown()}
      Selected City: { city  }
      {formatList()}
    </div>
  );

  
}

export default App;
