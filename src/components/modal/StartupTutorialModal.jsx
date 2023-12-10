import React, { useState, useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogContentText,
  Box,
  Typography,
  Button
} from "@mui/material";

import Img1 from "../../assets/image/step1.png";
import Img2 from "../../assets/image/step2.png";

import styles from "../../global.scss";

const StartupTutorialModal = ({ open, setOpen }) => {
  const descriptionElementRef = React.useRef(null);
  const scroll = "paper";
  const [page, setPage] = useState(0);

  useEffect(() => {
    if(open){
      setPage(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[open]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("tutorial", true);
    setTimeout(() => {
      setPage(-1);
    }, 500);
  };

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
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: "pre-wrap" }} id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
          {
            page === 0
            ?
              <>
                <Box style={{color: "black", fontSize: 14, padding: "20px", gap: "40px" }} 
                  className='flexCenterCenterColumn'>      
                  <Typography fontWeight={600} fontSize={28} style={{ fontFamily: "Raleway"}}>
                    Welcome to my assignment
                  </Typography>
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
                    onClick={() => {setPage(page+1)}}>
                    {
                      'Next'
                    }
                  </Button>
                </Box>
              </>
            :
              page === 1
              ?
                <>
                  <Box style={{color: "black", fontSize: 14, padding: "20px", gap: "20px" }} 
                    className='flexCenterCenterColumn'>      
                    <Typography fontWeight={600} fontSize={24} style={{ fontFamily: "Raleway"}}>
                      Connect to websocket or Refresh Manually
                    </Typography>
                    <img  
                      src={Img1}
                      alt="image_1"
                      />
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
                      onClick={() => {setPage(page+1)}}>
                      {
                        'Next'
                      }
                    </Button>
                  </Box>
                </>
              :
                page === 2
                ?
                  <>
                    <Box style={{color: "black", fontSize: 14, padding: "20px", gap: "40px" }} 
                      className='flexCenterCenterColumn'>      
                      <Typography fontWeight={600} fontSize={24} style={{ fontFamily: "Raleway"}}>
                        Panels are resizable and hiddable
                      </Typography>
                      <img  
                        src={Img2}
                        alt="image_2"
                        />
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
                        onClick={handleClose}>
                        {
                          'Let\'s begin!'
                        }
                      </Button>
                    </Box>
                  </>
                :
                  <></>
          }
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default StartupTutorialModal;