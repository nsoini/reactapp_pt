import { useEffect } from 'react';
import { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import ConfirmDelete from './ConfirmDelete';
import { Snackbar } from '@mui/material';
import { Button } from "@mui/material";
import { CSVLink } from 'react-csv';   

export default function Customerlist(){
    const [customers, setCustomers] = useState([]);
    const [openScanckbar, setOpenSnackbar] = useState(false);
    const [infoMsg, setInfoMsg] =useState('');
    const [dialogOpen,setDialogOpen] = useState(false);
    const [deleteData, setDeleteData] = useState({});

    //sarakkeet
    const columns = [
        {   headerName:'ACTIONS',
            cellRenderer: params => (
            <AddTraining addTraining={addTraining} params={params} />),
                width:142
                },

        { cellRenderer: params => (
            <EditCustomer updateCustomer={updateCustomer} params={params} />),
                width:90
                },
        { cellRenderer: params => 
            <Button size='small' variant="contained" color="error" onClick={() => openDelete(params)} >
                Delete 
                </Button>,
                width:100
                },
        { field: 'firstname',
        sortable: true, 
        filter: true ,
        width: 130},
        { field: 'lastname',
        sortable: true, 
        filter: true,
        width: 130 },
        { field: 'streetaddress',
        sortable: true, 
        filter: true,
        width: 150 },
        { field: 'postcode',
        sortable: true, 
        filter: true,
        width: 120 },
        { field: 'city',
        sortable: true, 
        filter: true,
        width: 120 },
        { field: 'email',
        sortable: true, 
        filter: true,
        width: 180 },
        { field: 'phone',
        sortable: true, 
        filter: true,
        width: 130 },
    ];

    useEffect(() => getCustomers(), []);

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    const getCustomers = () => {
        fetch(REST_URL)
        .then(response => response.json())
        .then(responseData => {
            setCustomers(responseData.content)
        })
        .catch(error => console.error(error));
    };

    const addCustomer = (customer) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok){
                setInfoMsg("New customer was added successfully.")
                setOpenSnackbar(true);
                getCustomers();
            } else{
                alert('Something went wrong truing to add the new customer.')
            }
        })
        .catch(err => console.error(err));
    }

    const deleteCustomer = () => {
        const url = deleteData.links[0].href;
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setInfoMsg('The customer was deleted successfully.');
                        setOpenSnackbar(true);
                        getCustomers();
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

    
    const updateCustomer = (customer, link) => {
        const url = link;
        const newUrl = url.replace("http", "https")
        console.log(newUrl);
        fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
                getCustomers();
            else
                alert('Something went wrong trying to edit the customer')
        })
        .catch(err => console.err(err));
    }

    const addTraining = (training) =>{
        const url = 'https://traineeapp.azurewebsites.net/api/trainings';
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok){
                setInfoMsg("New training was added to the customer successfully.")
                setOpenSnackbar(true);
                getCustomers();
            } else{
                alert('Something went wrong trying to add a new training.')
            }
        })
        .catch(err => console.error(err));

    }

    const cvsData = [
        ["Firstname", "Lastname", "Streetaddress", "Postcode", "City", "Email", "Phone"],
        ...customers.map(({ firstname, lastname, streetaddress, postcode, city, email, phone }) => [
            firstname,
            lastname,
            streetaddress,
            postcode,
            city,
            email,
            phone
        ]),
    ];

    
    return (
        <div>
            
            <AddCustomer addCustomer={addCustomer}/>
           
            <div className='ag-theme-material'
                style={{height: '700px', margin: 'auto'}}>
                    
                <CSVLink 
                filename='ptcustomers-file.csv' 
                data={cvsData}
                separator=';'
                style={{ marginLeft: '990px', textDecoration: 'none', color: '#2196F3' }}
                >Export to CSV</CSVLink>  
                
                <AgGridReact
                    columnDefs={columns}
                    rowData={customers}
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
                deletefunction={deleteCustomer} />
        
        </div>
        </div>
    
    );

}