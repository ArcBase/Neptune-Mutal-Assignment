import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { processWalletState } from '../../redux/actions/connectWeb'
import Navbar from '../pageComponents/navbar/navbar'
import Web3 from 'web3'

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

  const [NEPTokenAmount, setNEPTokenAmount] = useState<number>(1)
  const [BUSDTokenAmount, setBUSDTokenAmount] = useState<number>(3)

  const [addressBalance, setAddressBalance] = useState<string>("")
  const [chainId, setChainId] = useState<string>("")
  const [account, setAccount] = useState<string>("")

  const ConvertNEPtoBUSD = (amount: number) => {
    const caculatedAmount: number = amount * BUSDprice;
    setNEPTokenAmount(amount);
    setBUSDTokenAmount(caculatedAmount)
    console.log("This is the caculated amount", caculatedAmount);
  };


  const ConvertBUSDtoNEP = (amount: number) => {
    const caculatedAmount: number = NEPprice / amount
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

  const checkWalletDetails = async(e: any) => {
    e.preventDefault()
    if (account == null || account == undefined || account.length < 0) {
      console.log("wallet isn't connected")
    }

    await getDetails()


  }

  const getDetails = async () => {
    console.log("This is Account for Minting",)
    if (window.web3) {

      if (walletAddress == null || walletAddress == walletAddress || walletAddress.length < 0) {
        console.log("wallet isn't connected")
        return false
      }

      const web3 = window.web3
      const networkId = await web3.eth.net.getId();
      const balance = await web3.eth.get.balance(walletAddress)

      setChainId(networkId)
      setAddressBalance(balance)
      setAccount(walletAddress)

      console.log(networkId,balance,walletAddress)

    }
  }


  useEffect(() => {
    const connectWeb3 = async () => {
      if (typeof window !== undefined) {
        if (window.web3) {
          window.web3 = new Web3(window.ethereum);
          await getDetails()
        }
      }
    }
    connectWeb3()

  }, []);



  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-12 col-md-12">
            <div className="form-wrapper">
              <form>
                <div className="form-input-box">

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
                <div className="form-input-box">

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
                <div className="form-button">
                  <button
                    onClick={(e) => { checkWalletDetails(e) }}
                    className="mint-button">
                    Check Details
                  </button>
                </div>

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
    walletAddress: state.walletConnect.walletAddress
  };
};


const mapDispatchToProps = (dispatch: any) => {
  return {
    walletConnect: (thePublicAddress: string) => dispatch(processWalletState(thePublicAddress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConverterFormComponent);
