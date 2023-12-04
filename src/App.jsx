import { Tab, Tabs, Container } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Home from './components/Home';
import Calender from './components/Calender';

export default function App() {
  const [currentTabValue, setCurrentTabValue] = useState('one');

  const handleTabChange = (e, tabValue) => {
    setCurrentTabValue(tabValue);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <h1>PT HOME </h1>
        <Tabs value={currentTabValue} onChange={handleTabChange}>
          <Tab value='one' label='Home' />
          <Tab value='two' label='Customers' />   
          <Tab value='three' label='Trainings' />
          <Tab value='four' label='Calender' />    
        </Tabs>
        {currentTabValue === 'one' && <Home />}
        {currentTabValue === 'two' && <Customerlist />}
        {currentTabValue === 'three' && <Traininglist />}
        {currentTabValue === 'four' && <Calender />}
      </Container>
    </LocalizationProvider>
  );
}