import React, { Component } from "react";
import smart_contract from "../abis/Lottery.json";
import Web3 from "web3";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Navigation from "./Navbar";
import "./Styles/Tokens.css"; // Importamos el archivo de estilos

class Lottery extends Component {
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

      // Obtener precio del ticket
      const ticketPrice = await contract.methods.ticketPrice().call();
      this.setState({ ticketPrice });

      // Obtener tickets del usuario
      const myTickets = await contract.methods.viewTickets(accounts[0]).call();
      this.setState({ myTickets });
    } else {
      window.alert("¡The Smart Contract has not been deployed on the network!");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      contract: null,
      errorMessage: "",
      loading: true,
      ticketPrice: "Loading...",
      myTickets: [],
      showModal: false,
      showPurchaseModal: false,
      purchasedTickets: 0,
    };
  }

  _buyTicket = async (_numTickets) => {
    try {
      await this.state.contract.methods.buyTicket(_numTickets).send({
        from: this.state.account,
      });

      // Actualizar tickets del usuario después de la compra
      const myTickets = await this.state.contract.methods.viewTickets(this.state.account).call();
      this.setState({ myTickets, purchasedTickets: _numTickets, showPurchaseModal: true });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  togglePurchaseModal = () => {
    this.setState((prevState) => ({ showPurchaseModal: !prevState.showPurchaseModal }));
  };

  render() {
    const formattedTickets = Array.isArray(this.state.myTickets)
      ? this.state.myTickets.map((ticket, index) => (
          <Col key={index} xs={6} md={4} lg={2} style={{ marginBottom: "10px" }}>
            <div
              style={{
                backgroundColor: "#1a1a2e",
                padding: "10px",
                borderRadius: "5px",
                textAlign: "center",
                color: "#00d2ff",
              }}
            >
              {ticket}
            </div>
          </Col>
        ))
      : "No tickets available.";

    return (
      <div className="tokens-container">
        <Navigation account={this.state.account} />
        <div className="container">
          <h1 className="tokens-header">Lottery Management</h1>

          <div className="tokens-grid">
            <div className="tokens-card">
              <h3>Ticket Price</h3>
              <p>{this.state.ticketPrice} Tokens</p>
            </div>

            <div className="tokens-card">
              <h3>Buy Tickets</h3>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const amount = this._numTickets.value;
                  this._buyTicket(amount);
                }}
              >
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Number of tickets"
                  ref={(input) => (this._numTickets = input)}
                />
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="Buy Tickets"
                />
              </form>
            </div>

            <div className="tokens-card">
              <h3>My Tickets</h3>
              <Button
                onClick={this.toggleModal}
                className="btn btn-info btn-block"
                style={{ marginTop: "15px" }}
              >
                View My Tickets
              </Button>

              <Modal
                show={this.state.showModal}
                onHide={this.toggleModal}
                centered
                size="md"
                style={{ animation: "fadeIn 0.8s ease-out" }}
              >
                <Modal.Header
                  closeButton
                  style={{ backgroundColor: "#1a1a2e", color: "#00d2ff" }}
                >
                  <Modal.Title>My Lottery Tickets</Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{
                    backgroundColor: "#1a1a2e",
                    color: "#e0e0e0",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <h4>You have {this.state.myTickets.length} tickets:</h4>
                  <Row style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {formattedTickets}
                  </Row>
                </Modal.Body>
                <Modal.Footer
                  style={{ backgroundColor: "#1a1a2e", borderTop: "none" }}
                >
                  <Button
                    variant="secondary"
                    onClick={this.toggleModal}
                    style={{ backgroundColor: "#00d2ff", border: "none" }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

          {/* Modal de compra */}
          <Modal
            show={this.state.showPurchaseModal}
            onHide={this.togglePurchaseModal}
            centered
            size="md"
            style={{ animation: "fadeIn 0.8s ease-out" }}
          >
            <Modal.Header
              closeButton
              style={{ backgroundColor: "#1a1a2e", color: "#00d2ff" }}
            >
              <Modal.Title>Purchase Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                backgroundColor: "#1a1a2e",
                color: "#e0e0e0",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <h4>You have purchased {this.state.purchasedTickets} tickets!</h4>
              <p>Good luck in the lottery!</p>
            </Modal.Body>
            <Modal.Footer
              style={{ backgroundColor: "#1a1a2e", borderTop: "none" }}
            >
              <Button
                variant="secondary"
                onClick={this.togglePurchaseModal}
                style={{ backgroundColor: "#00d2ff", border: "none" }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Lottery;
