import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export interface ModalProps {
  message: string | undefined;
  closeModal: () => void;
}
export const BaseModal = ({ message, closeModal }: ModalProps) => {
  return (
    <Dialog open={!!message}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeModal}
          variant="contained"
          color="primary"
          autoFocus
        >
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  );
};
