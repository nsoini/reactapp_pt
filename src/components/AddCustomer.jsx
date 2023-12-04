import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props){
    //state
    const [customer, setCustomer] = useState({
                                    firstname: '',
                                    lastname: '',
                                    email: '',
                                    phone: '',
                                    streetaddress: '',
                                    postcode: '',
                                    city: '', 
                                    });
    const [dialogOpen, setDialogOpen] =useState(false);
    
    //functions
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick')
        setDialogOpen(false);
    }
    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }
    const handleSave = () => {
        props.addCustomer(customer);
        setDialogOpen(false);
    }

    //return
        //addbutton
        //dialog(add a form for new cusotmer)
    return(
        <>

        <Button
            variant="outlined" color="success" size="large"
            onClick={() => setDialogOpen(true)}>Add new Customer</Button>
      
        <Dialog
            open={dialogOpen}
            onClose={handleClose}>
                <DialogTitle>Add new customer</DialogTitle>
                <DialogContent>
                <TextField
                        margin='dense'
                        fullWidth
                        label='Firstname'
                        name='firstname'
                        value={customer.firstname}
                        onChange={handleInputChange}
                        ></TextField>
                <TextField
                        margin='dense'
                        fullWidth
                        label='Lastname'
                        name='lastname'
                        value={customer.lastname}
                        onChange={handleInputChange}
                        ></TextField>
                <TextField
                        margin='dense'
                        fullWidth
                        label='Email'
                        name='email'
                        value={customer.email}
                        onChange={handleInputChange}
                        ></TextField>
                <TextField
                        margin='dense'
                        fullWidth
                        label='Phone'
                        name='phone'
                        value={customer.phone}
                        onChange={handleInputChange}
                        ></TextField>
                <TextField
                        margin='dense'
                        fullWidth
                        label='Streetaddress'
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={handleInputChange}
                        ></TextField>
                <TextField
                        margin='dense'
                        fullWidth
                        label='Postcode'
                        name='postcode'
                        value={customer.postcode}
                        onChange={handleInputChange}
                        ></TextField>
                    <TextField
                        margin='dense'
                        fullWidth
                        label='City'
                        name='city'
                        value={customer.city}
                        onChange={handleInputChange}
                        ></TextField>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}>Close</Button>
                    <Button
                        onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}