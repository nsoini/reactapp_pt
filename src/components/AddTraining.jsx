import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";

export default function AddTraining(props){
    //state
    const [training, setTraining] = useState({
        date: null,
        activity: '',
        duration: 0,
        customer: ''
    });                        
    const [dialogOpen, setDialogOpen] =useState(false);
    
    //functions

    const handleSetCustomer = () => {
        setTraining({...training, customer : props.params.data.links[0].href });
        setDialogOpen(true); 
    }

    const handleDateChange = (date) => {
        setTraining({...training, date : date.toDate()})
    }

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick')
        setDialogOpen(false);
    }
    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }
    const handleSave = () => {
        props.addTraining(training);
        setDialogOpen(false);
    }

    //return
    return(
        <>
        <Button
            variant="contained" color="success" size='small'
            onClick={handleSetCustomer}>Add Training</Button>
        <Dialog
            open={dialogOpen}
            onClose={handleClose}>
                <DialogTitle>Add new training</DialogTitle>
                <DialogContent>
                <DateTimePicker
                        inputFormat="dd.MM.yyyy HH:mm"
                        ampm={false}
                        label='Time'
                        name='date'
                        selected={training.date}
                        onChange={handleDateChange}
                        ></DateTimePicker>
                <TextField
                        margin='dense'
                        fullWidth
                        label='Activity'
                        name='activity'
                        value={training.activity}
                        onChange={handleInputChange}
                        ></TextField>
                <TextField
                        margin='dense'
                        fullWidth
                        label='Duration'
                        name='duration'
                        value={training.duration}
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