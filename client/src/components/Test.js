import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { loadContract } from "../utils/load-contract";

function Test() {
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
    await contract.transfer({
      //function in funder.sol
      from: account,
      value: web3.utils.toWei("2", "ether"),
    });
    reloadPage();
  };

  const withdrawFund = async () => {
    const { contract, web3 } = web3api;
    const amount = web3.utils.toWei("1", "ether");
    await contract.withdraw(amount, {
      //function in funder.sol
      from: account,
    });
    reloadPage();
    console.log("ssss");
  };

  return (
    <div className="py-5">
      <div className="" style={{ fontWeight: "500" }}>
        Balance : {balance} ETH
      </div>
      <div className="my-3">
        Account : {account ? account : "not connected"}
      </div>
      <div className="d-flex justify-content-center">
        <div
          className="btn mx-3 btn-success"
          onClick={async () => {
            const acc = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log(acc);
          }}
        >
          Connect to MetaMask
        </div>
        <div className="btn mx-3 btn-success" onClick={transferFund}>
          Transfer
        </div>
        <div className="btn mx-3 btn-primary" onClick={withdrawFund}>
          Withdraw
        </div>
      </div>
    </div>
  );
}

export default Test;
