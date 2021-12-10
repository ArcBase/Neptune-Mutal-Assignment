import { useState,useEffect } from "react"
import Navbar from '../pageComponents/navbar/navbar'

const ConverterFormComponent = () => {

    const NEPprice : number = 1
    const BUSDprice : number = 3

    const [NEPTokenAmount, setNEPTokenAmount] = useState<number>(1)
    const [BUSDTokenAmount, setBUSDTokenAmount] = useState<number>(3)


    const ConvertNEPtoBUSD = (amount: number) => {
        const caculatedAmount: number = amount * BUSDprice;
        setNEPTokenAmount(amount);
        setBUSDTokenAmount(caculatedAmount)
        console.log("This is the caculated amount",caculatedAmount);
    };

    
    const ConvertBUSDtoNEP = (amount: number) => {
        const caculatedAmount: number =  NEPprice / amount
        setBUSDTokenAmount(amount);
        setNEPTokenAmount(caculatedAmount)
        console.log("This is the caculated amount",caculatedAmount);
    };


    const handleFormChange = (e:any,field:string) => {
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

    const checkWalletDetails = (e:any)=>{
        e.preventDefault()

    }

    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-lg-12 col-md-12">
                    <div  className="form-wrapper">
                    <form>
                    <div className="form-input-box">
              
                    <input
                    onChange={(e:any)=>{
                        handleFormChange(e,"convertAmountForNEPtoBUSD")
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
              onChange={(e:any)=>{
                  handleFormChange(e,"convertAmountForBUSDtoNEP")
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
              onClick={(e)=>{checkWalletDetails(e)}}
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

export default ConverterFormComponent;