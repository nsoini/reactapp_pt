import { useEffect } from 'react';
import { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';
import { Snackbar } from '@mui/material';
import { Button } from '@mui/material';
import ConfirmDelete from './ConfirmDelete';
import { CSVLink } from 'react-csv'; 
import Calender from './Calender';


export default function Traininglist(){

    const [trainings, setTrainings] = useState([]);
    const [openScanckbar, setOpenSnackbar] = useState(false);
    const [infoMsg, setInfoMsg] =useState('');
    const [dialogOpen,setDialogOpen] = useState(false);
    const [deleteData, setDeleteData] = useState({});

    //sarakkeet
    const columns = [
        { field: 'date',
        headerName: 'Time',
        cellRenderer: (params) => formatDate(params.value),
        sortable: true, 
        filter: true,
        width: '170' },
        { field: 'duration',
        sortable: true, 
        filter: true,
        width: 120 },
        { field: 'activity',
        sortable: true, 
        filter: true,
        width:170  },
        { field: 'customer.firstname',
        headerName: 'Firstname',
        sortable: true, 
        filter: true,
        width:130 },
        { field: 'customer.lastname',
        headerName: 'Lastname',
        sortable: true, 
        filter: true,
        width:130  },
        {   headerName:'ACTION',
            cellRenderer: params => 
            <Button size='small' variant="contained" color="error" onClick={() => openDelete(params)} >
                Delete 
                </Button>,
                width:100
                },
        
    ];
    
    const formatDate = (dateString) => {
        const formattedDate = dayjs(dateString).format('DD.MM.YYYY HH:mm');
        return formattedDate; 
    }

    useEffect(() => getTrainings(), []);

    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';

    const getTrainings = () => {
        fetch(REST_URL)
        .then(response => response.json())
        .then(responseData => {
            setTrainings(responseData);
        })
        .catch(error => console.error(error));
    };

    const deleteTraining = () => {
        const url = 'https://traineeapp.azurewebsites.net/api/trainings/' + deleteData.id;
        console.log(url);
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setInfoMsg('The workout was deleted successfully.');
                        setOpenSnackbar(true);
                        getTrainings();
                        setDialogOpen(false);
                    } else {
                        alert('Something went wrong');
                    }
                })
                .catch(error => console.error(error));
        };

        const openDelete = (params) => {
            setDialogOpen(true);
            setDeleteData(params.data);
        }

        const cvsData = [
            ["Time", "Duration", "Activity", "Firstname", "Lastname"],
            ...trainings.map(({ date, duration, activity, customer }) => [
                dayjs(date).format('DD.MM.YYYY HH:mm'), 
                duration,
                activity,
                customer ? customer.firstname : '',
                customer ? customer.lastname : ''  
            ]),
        ];

    return (
        <div>
            <h1>Workouts</h1>
            <div className='ag-theme-material'
                style={{height: '700px', width: '80%', margin: 'auto'}}>
                <CSVLink 
                filename='pttrainings-file.csv' 
                data={cvsData}
                separator=';'
                style={{ marginLeft: '730px', textDecoration: 'none', color: '#2196F3' }}>
                    Export to CSV</CSVLink>  
                <AgGridReact
                    columnDefs={columns}
                    rowData={trainings}
                    pagination={true}
                    paginationPageSize={10}
                   >
                </AgGridReact>
                <Snackbar
                    open={openScanckbar}
                    autoHideDuration={3000}
                    onClose={()=> setOpenSnackbar(false)}
                    message={infoMsg}>
                </Snackbar>
                <ConfirmDelete open={dialogOpen} closeDialog={() => setDialogOpen(false)}
                deleteData={deleteData}
                deletefunction={deleteTraining} />
            </div>
            <div>
            <Calender trainings={trainings}/>
      </div> 
        </div>
    );

}