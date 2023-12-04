import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export default function ConfirmDelete({open, closeDialog, deletefunction}){

    return(
        <>
        <Dialog
            open={open}
            onClose={closeDialog}
            >
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={closeDialog}>NO, cancel</Button>
                    <Button
                        onClick={deletefunction}>YES, delete</Button>
                </DialogActions>
        </Dialog>
        </>
    );
}