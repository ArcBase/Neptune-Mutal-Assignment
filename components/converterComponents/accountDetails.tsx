import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
    modalState : Boolean
}

const AccountDataComponent :React.FC<AccountData> =({address,balance,chainId ,modalState}:AccountData)=>{
    const [open, setOpen] = React.useState(modalState);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(address, balance, chainId ,"LKEK")

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={modalState}
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
                                            <p className=" text-black">
                                                Account
                                            </p>
                                        </div>
                                        <div className="account-data-row-right">
                                            <p className=" text-black">
                                                OxKenny
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
                                                87
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
                                                2.3 BNB
                                            </p>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <button
                                className="mint-button">
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