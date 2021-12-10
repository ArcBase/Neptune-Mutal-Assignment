import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {toggleAccountDetailsModalState} from '../../redux/actions/modalControl'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface AccountData {
    address : string ;
    balance : number;
    chainId : number,
    modalState : boolean
}

const AccountDataComponent :React.FC<AccountData> =({address,balance,chainId ,modalState}:AccountData)=>{
    const [modalControl, setOpen] = React.useState(modalState);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log("Modal State live",modalState)
        setOpen(!modalState)
        toggleAccountDetailsModalState(!modalState)
    }


    console.log(address, balance, chainId , modalState,"LKEK")

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={modalControl}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="">
                            <div className="account-data-section">
                            <div className="account-data-column">
                                    <div className="account-data-rows">
                                        <div className="account-data-row-left">
                                           
                                        </div>
                                        <div className="account-data-row-right">
                                        <div
                                        onClick={handleClose}>
                                        <i
                                        className="fa fa-times" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="account-data-column">
                                    <div className="account-data-rows">
                                        <div className="account-data-row-left">
                                            <p className=" text-black">
                                                Account
                                            </p>
                                        </div>
                                        <div className="account-data-row-right">
                                            <p className=" text-black">
                                            {`${address.substring(0, 15)}...`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="account-data-column">
                                    <div className="account-data-rows">
                                        <div className="account-data-row-left">
                                            <p className=" text-black">
                                                Chain Id
                                            </p>
                                        </div>
                                        <div className="account-data-row-right">
                                            <p className=" text-black">
                                            {chainId}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="account-data-column">
                                    <div className="account-data-rows">
                                        <div className="account-data-row-left">
                                            <p className=" text-black">
                                                Balance
                                            </p>
                                        </div>
                                        <div className="account-data-row-right">
                                            <p className=" text-black">
                                                {balance} BNB
                                            </p>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <button
                                className="submit-button">
                               Disconnect
                            </button>
                        </div>

                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default AccountDataComponent