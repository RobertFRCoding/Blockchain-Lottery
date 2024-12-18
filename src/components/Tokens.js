import React, { Component, useState, useEffect } from "react";
import smart_contract from "../abis/Lottery.json";
import Web3 from "web3";
import Navigation from "./Navbar";
import { Modal, Button } from "react-bootstrap";
import './Styles/Tokens.css';  

class Tokens extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Accounts: ", accounts);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("¡You should consider using Metamask!");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = smart_contract.networks[networkId];

    if (networkData) {
      const abi = smart_contract.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });

      const userBalance = await contract.methods
        .tokenBalance(this.state.account)
        .call();
      const contractTokenBalance = await contract.methods
        .contractTokenBalance()
        .call();
      const contractEtherBalance = await contract.methods
        .contractEtherBalance()
        .call();
      this.setState({
        userBalance,
        contractTokenBalance,
        contractEtherBalance: Web3.utils.fromWei(contractEtherBalance, "ether"),
      });
    } else {
      window.alert("¡The Smart Contract has not been deployed on the network!");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      loading: true,
      contract: null,
      errorMessage: "",
      userBalance: "0",
      contractTokenBalance: "0",
      contractEtherBalance: "0",
      notification: "",
      showModal: false,
      modalMessage: "",
      modalType: "",
    };
  }

  _buyTokens = async (_numTokens) => {
    try {
      const web3 = window.web3;
      const ethers = web3.utils.toWei(_numTokens, "ether");

      await this.state.contract.methods.buyTokens(_numTokens).send({
        from: this.state.account,
        value: ethers,
      });
      this.setState({
        notification: {
          message: `You have purchased ${_numTokens} tokens for ${ethers / 10 ** 18} Ether.`,
          type: "success",
        },
        showModal: true,
        modalMessage: `You have purchased ${_numTokens} tokens successfully.`,
        modalType: "success",
      });
    } catch (err) {
      console.error(err);
      this.setState({
        notification: {
          message: err.message,
          type: "error",
        },
        showModal: true,
        modalMessage: `Error: ${err.message}`,
        modalType: "error",
      });
    }
  };

  _returnTokens = async (_numTokens) => {
    try {
      const tokens = parseInt(_numTokens, 10);
      await this.state.contract.methods.returnTokens(tokens).send({
        from: this.state.account,
      });
      this.setState({
        notification: {
          message: `You have refunded ${tokens} tokens.`,
          type: "success",
        },
        showModal: true,
        modalMessage: `You have refunded ${tokens} tokens successfully.`,
        modalType: "success",
      });
    } catch (err) {
      console.error(err);
      this.setState({
        notification: {
          message: err.message,
          type: "error",
        },
        showModal: true,
        modalMessage: `Error: ${err.message}`,
        modalType: "error",
      });
    }
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="tokens-container">
        <Navigation account={this.state.account} />
        <div className="container">
          <h1 className="tokens-header">Token Lottery Management</h1>

          {/* Modal centrado */}
          <Modal show={this.state.showModal} onHide={this.handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.modalType === "success" ? "Success" : "Error"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{this.state.modalMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="tokens-grid">
            <div className="tokens-card">
              <h3>User Tokens</h3>
              <p>Balance: {this.state.userBalance}</p>
            </div>
            <div className="tokens-card">
              <h3>Available tokens</h3>
              <p>{this.state.contractTokenBalance}</p>
            </div>
            <div className="tokens-card">
              <h3>Accumulated prize</h3>
              <p>{this.state.contractEtherBalance} ETH</p>
            </div>
          </div>

          <div className="token-actions">
            <h3>Buy Tokens</h3>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const Quantity = this._numTokens.value;
                this._buyTokens(Quantity);
              }}
            >
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Amount"
                ref={(input) => (this._numTokens = input)}
              />
              <input
                type="submit"
                className="btn btn-primary btn-block"
                value="Buy Tokens"
              />
            </form>

            <RefundModal onSubmit={this._returnTokens} />
          </div>
        </div>
      </div>
    );
  }
}

const RefundModal = ({ onSubmit }) => {
  const [show, setShow] = useState(false);
  const [tokens, setTokens] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRefund = (e) => {
    e.preventDefault();
    onSubmit(tokens);
    setShow(false);
  };

  return (
    <>
      {/* Aseguramos que no haya fondo blanco en el contenedor */}
      <div
        style={{
          textAlign: "center",
          margin: "20px 0",
          backgroundColor: "transparent", // Elimina cualquier fondo blanco
          overflow: "hidden", // Evita que el texto animado muestre problemas al salir del contenedor
        }}
      >
        <p
          className="refund-link"
          onClick={handleShow}
          style={{
            display: "inline-block",
            color: "#00d2ff",
            textShadow: "0 0 15px #00d2ff",
            animation: "glowText 1.5s infinite alternate",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          Refund Tokens
        </p>
      </div>
  
      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{
          animation: "fadeIn 0.8s ease-out",
          backgroundColor: "#1a1a2e", // Fondo azul suave
          border: "none", // Sin bordes blancos
        }}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#1a1a2e", // Fondo azul suave en el header
            borderBottom: "none",
            animation: "glowHeader 1.5s infinite alternate",
          }}
        >
          <Modal.Title style={{ color: "#00d2ff", textShadow: "0 0 15px #00d2ff" }}>
            Refund Tokens
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#1a1a2e", // Fondo azul suave en el cuerpo del modal
            color: "#e0e0e0",
            border: "none", // Sin borde blanco
            boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)", // Sombra suave
            borderRadius: "15px",
            animation: "pulse 2s infinite",
          }}
        >
          <form onSubmit={handleRefund}>
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Enter tokens to refund"
              value={tokens}
              onChange={(e) => setTokens(e.target.value)}
              style={{
                fontSize: "1rem",
                padding: "0.75rem",
                borderRadius: "10px",
                border: "1px solid #00d2ff",
                backgroundColor: "#1a1a2e", // Fondo azul para el input
                color: "#ffffff",
                textShadow: "0 0 5px #00d2ff",
                animation: "glowInput 1.5s infinite alternate",
              }}
            />
            <Button
              type="submit"
              block
              style={{
                background: "#00d2ff",
                border: "none",
                color: "#000",
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "0.75rem",
                borderRadius: "10px",
                width: "100%",
                transition: "background 0.3s ease",
                boxShadow: "0 0 20px #00d2ff",
                animation: "glowButton 2s infinite alternate",
              }}
              onMouseOver={(e) => (e.target.style.background = "#00b3cc")}
              onMouseOut={(e) => (e.target.style.background = "#00d2ff")}
            >
              Refund
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Tokens;
