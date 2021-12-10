import React, { useState, useEffect } from "react";
import CustomSideNav from "./sideNav";
import Web3 from "web3";
import Link from "next/link";
// import Web3Modal from "web3modal";
import { connect } from "react-redux";
import {processWalletState} from '../../../redux/actions/connectWeb'

const NeptuneMutalLogo  = "https://neptunemutual.com/favicon-32x32.png"


const MainNavbar = (props) => {
  const [showSideNav, setShowSideNav] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
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
        
        props.walletConnect(accounts[0])

      }
    }
  };

  useEffect(() => {
  }, []);

  return (
    <>
      <section className="container ">
        <div className="flex-r">
          <div className="navbar-logo">
            <img
              src={NeptuneMutalLogo}
              alt="logo"
            />
          </div>
          <div className="navbar-order mr-auto sm-screen">
            <ul className=" flex-r">
              
                <Link href="/">
               <li>
                 Neptune Mutual
               </li>
                </Link>
              {/* <li>Resources</li> */}
              {showAddress ? (
                <Link href="/collections">
                  <li>Dashboard</li>
                </Link>
              ) : // <li>Crea</li>
                null} 
            </ul>
          </div>
          <div className="ml-auto navbar-order sm-screen">
            <ul className=" flex-r">
              {showAddress ? (
                <>
                  <li>
                    <button className="nav-button">
                      {`${ethAccounts.substring(0, 15)}...`}
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={connectWallet} className="nav-button">
                      Connect
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="c-sidenav-toggle">
            <i
              onClick={() => {
                setShowSideNav(!showSideNav);
              }}
              className="fa fa-bars c-sidenav-toggle-icon font-aw"
              aria-hidden="true"
            ></i>
          </div>

          {showSideNav ? (
            <>
              <CustomSideNav />
            </>
          ) : null}
        </div>
      </section>
    </>
  );
};

 
const mapStateToProps = (state) => {
  return {
    walletAddress : state.walletConnect.walletAddress
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    walletConnect: (thePublicAddress) => dispatch(processWalletState(thePublicAddress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
