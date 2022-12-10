import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import logo from "./images/myntra.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { loadContract } from "../utils/load-contract";

function Bag() {
  window.scroll(0, 0);
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}/`);
    setItems(await res.json());

    setLoading(false);
  };

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

  const transferFund = async () => {
    const { contract, web3 } = web3api;
    var price1 = items.price * 0.0000096;
    await contract.transfer({
      from: account,
      value: web3.utils.toWei(`${price1}`, "ether"),
    });
    reloadPage();
  };

  useEffect(() => {
    getData();
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
        style={{ borderBottom: "1px solid #d4d5d9" }}
      >
        <div className="d-flex py-3 px-3 w-100">
          <div className="">
            <NavLink to="/" className="align-items-center d-flex">
              <img
                src={logo}
                className="img-fluid"
                style={{ width: "80px", height: "50px" }}
              />
            </NavLink>
          </div>
          <div className="bagpath mx-auto">
            <ul
              className="navbar-nav align-items-center d-flex"
              style={{ marginLeft: "220px" }}
            >
              <li className="nav-item">
                <div
                  className="active nav-link text-info"
                  style={{ fontWeight: "500" }}
                >
                  BAG
                  <hr
                    className="p-0 m-0"
                    style={{ height: "2px", color: "blue" }}
                  ></hr>
                </div>
              </li>
              <div>-----------</div>
              <li className="nav-item">
                <div
                  className="nav-link text-dark"
                  style={{ fontWeight: "500" }}
                >
                  ADDRESS
                </div>
              </li>
              <div>-----------</div>
              <li className="nav-item">
                <div
                  className="nav-link text-dark"
                  style={{ fontWeight: "500" }}
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

      <div className="container" style={{ maxWidth: "1000px" }}>
        <div className="row">
          <div
            className="col-lg-8 col-12 pr-4 address"
            style={{ borderRight: "1px solid #d4d5d9" }}
          >
            <div
              className="d-flex rounded mb-2 mt-5"
              style={{ border: "1px solid #d4d5d9", padding: "16px" }}
            >
              <div style={{ fontSize: "12px" }}>
                Deliver to: <b>xxxxxxxxxxxx, 123456</b>
                <br></br> Lorem Ipsum is simply dummy text of the printing and
                typesetting industry...
              </div>
              <div className="ml-auto">
                <div
                  className="px-3 ml-2 rounded-0 mt-1 align-items-center rounded d-flex justify-content-center"
                  style={{
                    fontWeight: "500",
                    border: "1px solid rgb(255, 63, 108)",
                    fontSize: "14px",
                    height: "40px",
                    color: "rgb(255, 63, 108)",
                  }}
                >
                  CHANGE ADDRESS
                </div>
              </div>
            </div>

            <div
              className="d-flex rounded"
              style={{ border: "1px solid #d4d5d9", padding: "16px" }}
            >
              <div>
                <span className="fa fa-certificate fa-lg pr-2"></span>
                <span style={{ fontWeight: "500" }}>Available Offers</span>
                <div className="py-2 pl-2" style={{ fontSize: "12px" }}>
                  <li>
                    10% Instant Discount on SBI Credit Card on a min spend of Rs
                    3,000. TCA
                  </li>
                  <div
                    className="pl-3 py-2"
                    id="more"
                    style={{
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(255, 63, 108)",
                    }}
                    onClick={() => {
                      document.getElementById("less").style.display = "block";
                      document.getElementById("more").style.display = "none";
                    }}
                  >
                    Show More <span className="fa fa-angle-down fa-lg"></span>
                  </div>
                  <div id="less" style={{ display: "none" }}>
                    <li>
                      5% Unlimited Cashback on Flipkart Axis Bank Credit Card.
                      TCA
                    </li>
                    <li>
                      10% Cashback upto Rs 150 on Ola Money Postpaid or wallet
                      transaction on a min spend of Rs 1000 . TCA
                    </li>
                    <li>
                      15% Cashback upto Rs 150 on Freecharge Paylater
                      transaction. TCA
                    </li>
                    <li>
                      Upto Rs 500 Cashback on Mobikwik Wallet Transactions on a
                      min spend of Rs 999.Use code MBK500 on Mobikwik.TCA
                    </li>
                    <li>
                      5% Cashback upto Rs 150 on a minimum spend of Rs 1,500
                      with PayZapp. TCA
                    </li>
                    <div
                      className="text-danger pl-4 py-2"
                      style={{ cursor: "pointer", fontWeight: "500" }}
                      onClick={() => {
                        document.getElementById("less").style.display = "none";
                        document.getElementById("more").style.display = "block";
                      }}
                    >
                      Show Less
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-lg-3 mx-md-3 my-2">
              <div className="d-flex py-3">
                <input
                  type="checkbox"
                  className="form-check"
                  style={{ width: "16px" }}
                  checked
                />
                <b className="pl-2">1/1 ITEMS SELECTED</b>
                <div
                  className="ml-auto d-flex align-items-center"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  <div
                    className="pr-3"
                    style={{ borderRight: "1px solid black" }}
                  >
                    REMOVE
                  </div>
                  <div className="pl-3">MOVE TO WISHLIST</div>
                </div>
              </div>
            </div>

            <div
              className="rounded mb-4"
              style={{ border: "1px solid #d4d5d9", padding: "16px" }}
            >
              <div className="d-flex position-relative">
                {loading ? (
                  <div className="row d-flex gx-0">
                    <div className="col-2">
                      <Skeleton height={188} />
                    </div>
                    <div className="col-10 pl-3 pr-3">
                      <Skeleton className="" height={188} />
                    </div>
                  </div>
                ) : (
                  <div className="row d-flex gx-0">
                    <div className="col-2 align-items-center d-flex">
                      <img
                        src={items.image}
                        className="img-fluid p-lg-2 p-md-2"
                      />
                    </div>
                    <div className="col-10 pl-3" style={{ fontSize: "14px" }}>
                      <div style={{ fontWeight: "500" }}> {items.title}</div>
                      <div>{items.category}</div>
                      <div
                        style={{ fontSize: "12px", color: "rgb(167 169 173)" }}
                      >
                        Sold By: Flashstar Commerce
                      </div>
                      <select
                        className="border-0 rounded mt-3"
                        style={{
                          outline: "none",
                          cursor: "pointer",
                          background: "rgb(212 213 217 / 43%)",
                          fontWeight: "500",
                        }}
                      >
                        <option disabled selected hidden>
                          Size
                        </option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                      </select>
                      <select
                        className="border-0 rounded my-2 ml-3"
                        style={{
                          outline: "none",
                          cursor: "pointer",
                          background: "rgb(212 213 217 / 43%)",
                          fontWeight: "500",
                        }}
                      >
                        <option disabled selected hidden>
                          Qty
                        </option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                      </select>
                      <br></br>
                      <div className="py-1">
                        <span
                          style={{
                            fontWeight: "500",
                          }}
                        >
                          $ {items.price}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "lighter",
                            color: "grey",
                          }}
                        >
                          &nbsp;&nbsp;₹<del>1849</del>
                        </span>
                        <span
                          className="text-danger"
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          &nbsp;&nbsp;(50% OFF)
                        </span>
                      </div>
                      <div style={{ fontSize: "12px" }}>
                        <div className="fa fa-check text-success"></div>
                        &nbsp;Delivery by
                        <span style={{ fontWeight: "500" }}>
                          {" "}
                          &nbsp;
                          {new Date().toLocaleString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="bg-white fa-2x position-absolute"
                  style={{ height: "0px", marginLeft: "97%", top: "-20px" }}
                >
                  &times;
                </div>
              </div>
            </div>

            <div
              className="d-flex rounded align-items-center mb-5"
              style={{ border: "1px solid #d4d5d9", padding: "16px" }}
            >
              <div className="" style={{ fontWeight: "500", fontSize: "14px" }}>
                <span className="fa fa-bookmark-o fa-lg pr-2" />
                Add More From Wishlist
              </div>
              <div className="ml-auto">
                <div className="fa fa-angle-right fa-lg"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-3">
            <div
              className="mt-4"
              style={{ fontWeight: "500", fontSize: "12px" }}
            >
              SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
            </div>
            <div className="py-4 d-flex">
              <input
                type="checkbox"
                className="form-check"
                style={{ width: "15px", fontSize: "14px", cursor: "pointer" }}
              />{" "}
              <div style={{ fontWeight: "600" }}>
                &nbsp;&nbsp;&nbsp;Support Us
              </div>
            </div>

            <div
              className="pb-3"
              style={{ fontSize: "16px", fontWeight: "500" }}
            >
              <span
                className=""
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  borderRadius: "35px",
                  border: "1px solid #d4d5d9",
                }}
              >
                ₹10
              </span>
              <span
                className="ml-3"
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  borderRadius: "35px",
                  border: "1px solid #d4d5d9",
                }}
              >
                ₹50
              </span>
              <span
                className="mx-3"
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  borderRadius: "35px",
                  border: "1px solid #d4d5d9",
                }}
              >
                ₹100
              </span>
              <span
                className=""
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  borderRadius: "35px",
                  border: "1px solid #d4d5d9",
                }}
              >
                Other
              </span>
            </div>
            <hr style={{ color: "#d4d5d9" }}></hr>

            <div className="">
              <div
                style={{
                  color: "grey",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                COUPONS
              </div>
              <div className="py-3 d-flex align-items-center">
                <span className="fa fa-tag fa-lg pr-4"></span>
                <span style={{ fontWeight: "500" }}>Apply Coupons</span>
                <div className="ml-auto">
                  <div
                    className="text-danger rounded-0 align-items-center rounded d-flex justify-content-center"
                    style={{
                      fontWeight: "500",
                      border: "1px solid rgb(255, 63, 108)",
                      fontSize: "14px",
                      cursor: "pointer",
                      padding: "4px 16px",
                    }}
                  >
                    APPLY
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ color: "#d4d5d9" }}></hr>

            <div>
              <div
                className="py-2"
                style={{ fontWeight: "500", fontSize: "14px" }}
              >
                PRICE DETAILS(3 Items)
              </div>
              {loading ? (
                <div className="">
                  <Skeleton height={148} />
                </div>
              ) : (
                <div style={{ fontSize: "13.5px" }}>
                  <div className="d-flex align-items-center">
                    <div className="py-2">Total MRP</div>
                    <div className="ml-auto">
                      <b>$</b> {items.price}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="py-2">Discount on MRP</div>
                    <div className="ml-auto text-success">-₹1150</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="py-2">Coupon Discount</div>
                    <div className="ml-auto">
                      <span className="text-danger">Apply Coupon</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="py-2">
                      Convenience Fee{" "}
                      <span className="text-danger">
                        <b>Know More</b>
                      </span>
                    </div>
                    <div className="ml-auto">
                      <del>₹99</del>
                      <span className="text-success pl-2">FREE</span>{" "}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <hr style={{ color: "#d4d5d9" }}></hr>

            <div
              className="d-flex align-items-center"
              style={{ fontSize: "14px", fontWeight: "600" }}
            >
              <div className="py-2">Total Amount</div>
              <div className="ml-auto">$&nbsp;XXX</div>
            </div>

            <div
              className="btn btn-danger border-0 rounded-0 w-100 my-2 py-2"
              style={{ background: "rgb(255, 63, 108)" }}
              onClick={transferFund}
            >
              <b>PLACE ORDER</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bag;
// <div className="" style={{ fontWeight: "500" }}>
// Balance : ₹ {balance * 104327.87}
// </div>
// <div className="my-3">
// Account : {account ? account : "not connected"}
// </div>
