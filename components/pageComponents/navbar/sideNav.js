import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { processWalletState } from "../../../redux/actions/connectWeb";
import Link from "next/link";
import Web3 from "web3";


const CustomSideNav = (props) => {
  const ethAccount = props.walletAddress;
  const [showAddress, setShowAddress] = useState(false);
  const [ethAccounts, setEthAccounts] = useState([]);

  const connectWallet = async () => {
    if (typeof window !== undefined) {
      if (window.web3) {
        window.web3 = new Web3(window.ethereum);

        await window.ethereum.send("eth_requestAccounts");
        // await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setEthAccounts(accounts[0]);
        setShowAddress(true);

        props.walletConnect(accounts[0]);
      }
    }
  };

  useEffect(() => {
    if (props.walletAddress.length != null) {
      setShowAddress(true);
    }
  }, []);

  return (
    <>
      <div className="c-sideNavBody">
        <div className="container">
          <div className="row">
            <div className="c-sideNav-account">
              <div className="col-lg-6 col-sm-12 mt-4">
                <p className="text-left text-white c-sideNav-account-text-large">
                  Account
                </p>
                <div className="flex-r">
                  {showAddress ? (
                    <>
                      <span className="address-icon mt-3">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMTcxLDIxNywzOCwxKTsgc3Ryb2tlOnJnYmEoMTcxLDIxNywzOCwxKTsgc3Ryb2tlLXdpZHRoOjAuMjsnPjxyZWN0ICB4PScxOCcgeT0nMTInIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTgnIHk9JzE1JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE4JyB5PScxOCcgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScxOCcgeT0nMjEnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTgnIHk9JzI0JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE1JyB5PScxNScgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScyMScgeT0nMTUnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTUnIHk9JzE4JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzIxJyB5PScxOCcgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScxNScgeT0nMjEnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMjEnIHk9JzIxJyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE1JyB5PScyNCcgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScyMScgeT0nMjQnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTInIHk9JzEyJyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzI0JyB5PScxMicgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScxMicgeT0nMTUnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMjQnIHk9JzE1JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzEyJyB5PScyNCcgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScyNCcgeT0nMjQnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48L2c+PC9zdmc+" />
                      </span>
                      <p className="mt-3 p-align c-sideNav-account-text-small">
                        <>{`${ethAccount.substring(0, 15)}...`}</>
                      </p>
                      ):(
                    </>
                  ) : (
                    <>
                      <button onClick={connectWallet} className="nav-button mt-4">
                        Connect Wallet
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-sm-7 col-md-5">
              <ul className="c-sideNav-orderList">
                <li className="c-sideNav-orderList-item">
                  <Link href="/">
                    <p className="c-sideNav-text">
                      Neptune Mutual
                    </p>
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    walletAddress: state.walletConnect.walletAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    walletConnect: (thePublicAddress) => dispatch(processWalletState(thePublicAddress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomSideNav);
