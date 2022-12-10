import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import logo from "./images/myntra.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Address() {
  window.scroll(0, 0);
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}/`);
    setItems(await res.json());

    setLoading(false);
  };
  var price = items.price;
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
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
                <div
                  className="nav-link p-0"
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#20BD99",
                    borderBottom: "2px solid #20BD99",
                  }}
                >
                  ADDRESS
                </div>
              </li>
              <div className="mx-2">-----------</div>
              <li className="nav-item">
                <div
                  className="nav-link p-0 text-dark"
                  style={{ fontWeight: "500", fontSize: "14px" }}
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
            className="col-lg-8 col-12 address"
            style={{ borderRight: "1px solid #eaeaec", paddingRight:"40px" }}
          >
            <div className="d-flex mb-2 mt-4">
              <div style={{ fontWeight: "600", fontSize: "18px" }}>
                Select Delivery Address
              </div>
              <div className="ml-auto">
                <div
                  className="align-items-center rounded d-flex justify-content-center"
                  style={{
                    fontWeight: "500",
                    border: "1px solid black",
                    fontSize: "12px",
                    padding: "7px 16px",
                  }}
                >
                  ADD NEW ADDRESS
                </div>
              </div>
            </div>

            <div style={{ fontSize: "12px", fontWeight: "600" }}>
              DEFAULT ADDRESS
            </div>
            <div
              className="d-flex my-3 rounded"
              style={{
                boxShadow: "0 0 4px rgb(40 44 63 / 20%)",
                padding: "16px",
              }}
            >
              <input type="radio" name="radio" className="mt-2" style={{ width: "20px", height:"fit-content" }} checked />
              <div className=" ml-3">
                <div className="d-flex">
                  <div style={{ fontWeight: "600" }}>xxxxxxxxxxxxx</div>
                  <span
                    className="align-items-center d-flex ml-2"
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      lineHeight: "0",
                      border: "1px solid #03a685",
                      color: " #03a685",
                      borderRadius: "50px",
                      padding: "2px 8px",
                    }}
                  >
                    HOME
                  </span>
                </div>
                <div
                  className="my-2"
                  style={{ fontSize: "12px", color: "#696E79" }}
                >
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br></br>
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br></br>
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </div>
                <div
                  className=""
                  style={{ color: "#696E79", fontSize: "12px" }}
                >
                  Mobile: <b>xxxxxxxxxx</b>
                </div>
                <li
                  className="my-3"
                  style={{ color: "#696E79", fontSize: "12px" }}
                >
                  Pay on Delivery available
                </li>
                <div className="d-flex">
                  <div
                    className="align-items-center rounded d-flex justify-content-center mr-3"
                    style={{
                      fontWeight: "600",
                      border: "1px solid black",
                      fontSize: "12px",
                      padding: "6px 16px",
                    }}
                  >
                    REMOVE
                  </div>
                  <div
                    className="align-items-center rounded d-flex justify-content-center"
                    style={{
                      fontWeight: "600",
                      border: "1px solid black",
                      fontSize: "12px",
                      padding: "6px 16px",
                    }}
                  >
                    EDIT
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded mb-4 py-4 shadow-sm"
              style={{
                border: "1px dashed #d4d5d9",
                padding: "16px",
                fontWeight: "600",
                color: "#ff3f6c",
              }}
            >
              + Add New Address
            </div>
          </div>

          <div className="col-lg-4 col-12 p-3">
            <div
              className="mt-3"
              style={{ fontWeight: "500", fontSize: "12px" }}
            >
              DELIVERY ESTIMATES
            </div>
            <div className="d-flex align-items-center mt-3 mb-4">
              <img
                alt=""
                src=""
                className="img-fluid mr-2"
                style={{ height: "48px", width: "36px" }}
              />
              <div>
                &nbsp;Estimated delivery by <b>xxxxxxx</b>
              </div>
            </div>
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
                <div style={{ fontSize: "13.5px", color: "#696E79" }}>
                  <div className="d-flex align-items-center">
                    <div className="pt-2">Total MRP</div>
                    <div className="ml-auto text-dark">
                      <b>$</b> {items.price}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="pt-2">Discount on MRP</div>
                    <div className="ml-auto text-success">-₹1150</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="pt-2">Coupon Discount</div>
                    <div className="ml-auto">
                      <span className="text-danger">Apply Coupon</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="pt-2">
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

            <div
              className="d-flex align-items-center mt-2"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                borderTop: "1px solid #eaeaec",
              }}
            >
              <div className="pt-3 pb-2">Total Amount</div>
              <div className="ml-auto">$&nbsp;XXX</div>
            </div>
            {loading ? (
              <div className="">
                <div
                  className="btn btn-danger border-0 rounded-0 w-100 my-2 py-2"
                  style={{ background: "rgb(255 63 108 / 37%)" }}
                >
                  <b>CONTINUE</b>
                </div>
              </div>
            ) : (
              <NavLink
                className="text-decoration-none"
                to={`/myntra/${id}/payment/${price}`}
              >
                {" "}
                <div
                  className="btn btn-danger border-0 rounded-0 w-100 my-2 py-2"
                  style={{ background: "rgb(255, 63, 108)" }}
                >
                  <b>CONTINUE</b>
                </div>
              </NavLink>
            )}
          </div>
        </div>
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

export default Address;
