import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  Button,
  CircularProgress,
  Box
} from "@mui/material";

import { 
  ActOnSpectrum 
} from '../../redux/actions/spectrumActions';

import styles from "../../global.scss";

const ActionRequiredModal = ({ open, setOpen }) => {
  const descriptionElementRef = React.useRef(null);
  const dispatch = useDispatch();
  const scroll = "paper";
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(ActOnSpectrum(setLoading)).then(() => {
      handleClose();
    });
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      PaperProps={{
        style: { borderRadius: 20 }}}
    >
      <DialogTitle id="scroll-dialog-title" className='flexCenterCenterRow'>
        <span style={{ fontSize: 16, fontWeight: 600, fontFamily: "Raleway"}}>
          { "Critical Action Required" }
        </span>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ whiteSpace: "pre-wrap" }} id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
          <Divider sx={{marginBottom: "15px"}}/>

          <Box style={{color: "black", fontSize: 14 }} className='flexCenterCenterRow'>      
            <Button
              variant='contained'
              sx={{
                backgroundColor: styles["primary"],
                color: styles["secondary"],
                fontSize: "18px",
                fontWeight: "700",
                fontFamily: "Raleway",
                borderRadius: "12px",
                width: "160px",
                height: "45px"
              }}
              disabled={loading}
              onClick={handleSubmit}>
              {
                loading
                ?
                <CircularProgress sx={{ color: styles["secondary"] }} size={"30px"} />
                :
                'Take Action!'
              }
            </Button>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default ActionRequiredModal;