import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Web3 from "web3";
import { connect } from "react-redux";
import { processWalletState } from '../../redux/actions/connectWeb'

declare global {
    interface Window {
        web3: any;
        ethereum?: any;
    }
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "8px"
};

interface ModalInterface {
    walletConnect(data: string): string
}


const ConnectWalletModal : React.FC<ModalInterface>= ({walletConnect}: ModalInterface) => {

    const [modalControl, setOpen] = React.useState(false);
    const handleOpen = (e:any) => {
        e.preventDefault()
        setOpen(true)
    };
    const handleClose = (e:any) => {
        e.preventDefault()
        setOpen(!modalControl)
    };

    const connectWallet = async (e: any) => {
        e.preventDefault()
        if (typeof window !== undefined) {
            if (window.web3) {
                window.web3 = new Web3(window.ethereum);

                await window.ethereum.send("eth_requestAccounts");
                    const web3 = window.web3
                    const accounts = await web3.eth.getAccounts();
                    walletConnect(accounts[0])
                    setOpen(!modalControl)
            }
        }
    };


    return (
        <div>
           
            <form>
            <div className="form-button">
                  <button
                    onClick={(e)=>{handleOpen(e)}}
                    className="submit-button">
                    Check Details
                  </button>
                </div>
            </form>

            <Modal
                open={modalControl}
                onClose={(e)=>{handleClose(e)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="account-data-section">
                            <div className="account-data-column">
                                <div className="account-data-rows">
                                    <div className="account-data-row-left">
                                        <button
                                            onClick={(e) => { connectWallet(e) }}
                                            className="submit-button">
                                            Connect
                                        </button>
                                    </div>
                                    <div className="account-data-row-right">
                                        <button
                                            onClick={handleClose}
                                            className="cancel-button">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        walletAddress: state.walletConnect.walletAddress
    };
};


const mapDispatchToProps = (dispatch: any) => {
    return {
        walletConnect: (thePublicAddress: string) => dispatch(processWalletState(thePublicAddress)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWalletModal);
