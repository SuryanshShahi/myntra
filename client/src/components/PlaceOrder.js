import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import logo from "./images/myntra.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { loadContract } from "../utils/load-contract";
import Swal from "sweetalert2";

function PlaceOrder() {
  window.scroll(0, 0);
  const { id, price } = useParams();

  const [web3api, setweb3api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [reload, setReload] = useState(false);

  const reloadPage = () => setReload(!reload);
  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    web3api.contract && loadBalance();
  }, [web3api, reload]);

  useEffect(() => {
    const loadProviders = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Payment", provider);

      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setweb3api({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        console.error("Please install Metamask");
      }
    };
    loadProviders();
  }, []);
  console.log(web3api.web3);

  useEffect(() => {
    const getAcc = async () => {
      const accounts = await web3api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3api.web3 && getAcc();
  }, [web3api.web3]);

  var price1 = price * 0.0000096;

  const transferFund = async () => {
    const { contract, web3 } = web3api;
    await contract.transfer({
      from: account,
      value: web3.utils.toWei(`${price1}`, "ether"),
    });
    Swal.fire("", "Order Placed", "success", {
      timer: 2200,
      buttons: false,
    });
    reloadPage();
  };

  useEffect(() => {
    document.getElementById("footer").style.display = "none";
    document.title = `SHOPPING BAG`;
    document.body.style.background = "none";
  }, []);
  return (
    <section id="bag">
      <div className="backdrop" id="backdrop">
        .
      </div>
      <nav
        className="navbar navbar-expand-lg bg-white p-0 m-0 px-lg-5 px-md-5"
        style={{ borderBottom: "1px solid #eaeaec", height: "80px" }}
      >
        <div className="d-flex py-3 px-3 w-100">
          <div className="">
            <NavLink to="/" className="align-items-center d-flex">
              <img
                src={logo}
                className="img-fluid"
                style={{ width: "45px", height: "31px" }}
              />
            </NavLink>
          </div>
          <div className="bagpath mx-auto">
            <ul
              className="navbar-nav align-items-center d-flex"
              style={{ marginLeft: "220px" }}
            >
              <li className="nav-item">
                <NavLink
                  className="text-decoration-none"
                  to={`/myntra/${id}/bag`}
                >
                  <div
                    className="nav-link p-0 text-dark"
                    style={{
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    BAG
                  </div>
                </NavLink>
              </li>
              <div className="mx-2">-----------</div>
              <li className="nav-item">
                <NavLink
                  className="text-decoration-none"
                  to={`/myntra/${id}/address`}
                >
                  {" "}
                  <div
                    className="nav-link p-0 text-dark"
                    style={{
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    ADDRESS
                  </div>
                </NavLink>
              </li>
              <div className="mx-2">-----------</div>
              <li className="nav-item">
                <div
                  className="nav-link p-0"
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#20BD99",
                    borderBottom: "2px solid #20BD99",
                  }}
                >
                  PAYMENT
                </div>
              </li>
            </ul>
          </div>
          <div
            className="ml-auto d-flex align-items-center"
            style={{ fontWeight: "500" }}
          >
            <span className="fa fa-shield fa-2x text-info pr-2"></span> 100%
            SECURE
          </div>
        </div>
      </nav>
      <div className="text-center mt-5" style={{ fontWeight: "500" }}>
        Amount to pe paid : ₹ {price} &nbsp; or &nbsp; {price1} ETH
      </div>
      <div className="text-center my-3 mb-5" style={{ fontWeight: "500" }}>
        Balance : ₹ {balance * 104327.87}
      </div>
      <div
        className="btn btn-danger border-0 rounded-0 w-100 my-2 py-2"
        style={{ background: "rgb(255, 63, 108)" }}
        onClick={transferFund}
      >
        <b>PLACE ORDER</b>
      </div>
      <hr style={{ color: "#d4d5d9" }}></hr>
      <div className="container my-4" style={{ maxWidth: "1000px" }}>
        <div className="row">
          <div className="col-lg-8 col-12 text-center">
            <img
              alt=""
              className="my-3 img-fluid text-center w-100"
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg"
            />
          </div>
          <div
            className="col-lg-4 col-12 justify-content-end d-flex align-items-center"
            style={{ fontWeight: "600", fontSize: "14px" }}
          >
            Need Help? Contact Us
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlaceOrder;
// <div className="" style={{ fontWeight: "500" }}>
// Balance : ₹ {balance * 104327.87}
// </div>
// <div className="my-3">
// Account : {account ? account : "not connected"}
// </div>
