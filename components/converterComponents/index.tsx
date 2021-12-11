import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { processWalletState } from '../../redux/actions/connectWeb'
import Navbar from '../pageComponents/navbar/navbar'
import { useToasts } from "react-toast-notifications";
import Web3 from 'web3'
import AccountDataComponent from './accountDetails'
import ConnectWalletModal from './connectWalletModal'

declare global {
  interface Window {
    web3: any;
    ethereum?: any;
  }
}

const ConverterFormComponent = (props: any) => {

  const { walletAddress } = props


  const NEPprice: number = 1
  const BUSDprice: number = 3

  const [showAccountModal, setshowAccountModal] = useState(false)

  const [showConnectWalletModal, setshowConnectWalletModal] = useState(true)

  const [NEPTokenAmount, setNEPTokenAmount] = useState<number>(1)
  const [BUSDTokenAmount, setBUSDTokenAmount] = useState<number>(3)

  const [addressBalance, setAddressBalance] = useState<number>(0)
  const [NetworkChainId, setChainId] = useState<number>(0)
  const [account, setAccount] = useState<string>("")

  const ConvertNEPtoBUSD = (amount: number) => {
    const caculatedAmount: number = amount * BUSDprice;
    setNEPTokenAmount(amount);
    setBUSDTokenAmount(caculatedAmount)
    console.log("This is the caculated amount", caculatedAmount);
  };


  const ConvertBUSDtoNEP = (amount: number) => {
    const caculatedAmount: number = (amount / BUSDprice) * NEPprice

    setBUSDTokenAmount(amount);
    setNEPTokenAmount(caculatedAmount)
    console.log("This is the caculated amount", caculatedAmount);
  };


  const handleFormChange = (e: any, field: string) => {
    switch (field) {
      case "convertAmountForNEPtoBUSD":
        ConvertNEPtoBUSD(e.target.value)
        break;
      case "convertAmountForBUSDtoNEP":
        ConvertBUSDtoNEP(e.target.value)
        break;
      default:
        break
    }
  }

  const checkWalletDetails = async () => {
    if (walletAddress == null || walletAddress == undefined ||
      walletAddress.length < 0 || walletAddress == "") {
      console.log("wallet isn't connected")
      setshowConnectWalletModal(true)
      setshowAccountModal(false)
      notifyEvent("Error", "Metamask Not Connected")

      console.log(showConnectWalletModal)
      return false
    }
    console.log("Wallet is connected", walletAddress, showAccountModal)
    if (showAccountModal == false) {
      setshowAccountModal(true)
      setshowConnectWalletModal(false)
      return 0
    }


  }

  const getDetails = async () => {
    if (window.web3) {
      if (props.walletAddress == null) {
        return false
      }

      console.log("Wallet", walletAddress)
      const web3 = window.web3
      const networkId = await web3.eth.net.getId();
      const myAccount = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(myAccount[0])

      const etherValue: string = Web3.utils.fromWei(String(balance), 'ether');

      setChainId(networkId)
      setAddressBalance(parseInt(etherValue))
      setAccount(walletAddress)

      console.log("The Balance", balance)
      console.log("Network chain Id", networkId)

    }
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

    return true;
  };



  useEffect(() => {
    if (props.walletAddress != "" || props.walletAddress != undefined
      || props.walletAddress != null || props.walletAddress.length < 0) {
      const connectWeb3 = async () => {
        if (typeof window !== undefined) {
          if (window.web3) {
            window.web3 = new Web3(window.ethereum);
            await getDetails()
            await checkWalletDetails()
          }
        }
      }
      connectWeb3()
    }

  }, [props.walletAddress]);



  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-12 col-md-12 form-mt">
          <p className="text-center converter-text">
                  Neptune Mutual Token Converter
                </p>

            <div className="form-wrapper">

              <form>
                <div className="form-input-box">
                  <p className="text-bold ">
                    NEP
                  </p>
                  <input
                    onChange={(e: any) => {
                      handleFormChange(e, "convertAmountForNEPtoBUSD")
                    }}
                    className="authForm"
                    type="text"
                    name="amountNaira"
                    value={NEPTokenAmount}
                    placeholder="NEP Amount"
                  />
                </div>

                <div className="pt-2  form-icon-box">
                  <i className="fa fa-exchange text-center" aria-hidden="true"></i>
                  </div>


                <div className=" form-input-box">
                <p className="text-bold ">
                      BUSD
                      </p>
                  <input
                    onChange={(e: any) => {
                      handleFormChange(e, "convertAmountForBUSDtoNEP")
                    }}
                    className="authForm"
                    type="text"
                    name="amountNaira"
                    value={BUSDTokenAmount}
                    placeholder="BUSD Amount"
                  />
                </div>

                {
                  showAccountModal ? (
                    <>
                      <AccountDataComponent
                        address={walletAddress}
                        balance={addressBalance}
                        chainId={NetworkChainId}

                      />
                    </>
                  ) : null
                }

                {
                  showConnectWalletModal ? (
                    <>
                      <ConnectWalletModal
                      />
                    </>
                  ) : null
                }


              </form>
            </div>
          </div>

        </div>
      </div>


    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    walletAddress: state.walletConnect.walletAddress,
    // modalStateController : state.modalStateController.accountDetailsModalState
  };
};


const mapDispatchToProps = (dispatch: any) => {
  return {
    walletConnect: (thePublicAddress: string) => dispatch(processWalletState(thePublicAddress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConverterFormComponent);
