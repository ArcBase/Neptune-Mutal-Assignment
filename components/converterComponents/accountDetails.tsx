import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { connect } from "react-redux";
import { processWalletState } from '../../redux/actions/connectWeb'
import { useToasts } from "react-toast-notifications";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
};

interface AccountData {
    address: string;
    balance: number;
    chainId: number,
    walletConnect(data: any): any
}

const AccountDataComponent: React.FC<AccountData> = ({ address, balance, chainId, walletConnect }: AccountData) => {
    const [modalControl, setOpen] = React.useState(false);
    const handleOpen = (e: any) => {
        e.preventDefault()
        setOpen(true)
    };
    const handleClose = (e: any) => {
        e.preventDefault()
        setOpen(!modalControl)
    }


    const { addToast } = useToasts();
    // ------------- ------------------- ///
    const notifyEvent = (type: string, message: string) => {
        switch (type) {
            case "Success":
                addToast(message, { appearance: "success" });
                break;
            case "Error":
                addToast(message, { appearance: "error" });
                break;
            case "Info":
                addToast(message, { appearance: "info" });
                break;
            default:
                break;
        }

    }

    const disconnectWallet = (e: any) => {
        e.preventDefault()
        walletConnect("")
        notifyEvent("Success", "Dissconnected Wallet")
    }

    return (
        <div>

            <div className="form-button">
                <button
                    onClick={(e) => { handleOpen(e) }}
                    className="submit-button">
                    Check Details
                </button>
            </div>
            <Modal
                open={modalControl}
                onClose={(e) => { handleClose(e) }}
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
                                            <h4 className='text-large'>
                                                Wallet Details
                                            </h4>

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
                                onClick={(e) => { disconnectWallet(e) }}
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountDataComponent);
