import { useState,useEffect } from "react"

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
        const caculatedAmount: number = amount * NEPprice;
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

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-lg-12 col-md-12">
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
                    </form>

                </div>

            </div>
        </div>

        </>
    )
}

export default ConverterFormComponent;