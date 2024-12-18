import React, { Component } from "react";
import smart_contract from "../abis/Lottery.json";
import Web3 from "web3";
import Swal from "sweetalert2";
import Navigation from "./Navbar";
import "./Styles/Tokens.css"; // Reutilizamos el CSS de Tokens

class Winner extends Component {
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
      winnerAddress: null, // Almacenamos la dirección del ganador
      winningTicket: null, // Almacenamos el número del boleto ganador
    };
  }

  _generateWinner = async () => {
    try {
      console.log("Generating winner in progress...");
      await this.state.contract.methods.generateWinner().send({
        from: this.state.account,
      });
      Swal.fire({
        icon: "success",
        title: "Winner generated successfully!",
        background: "#1a1a2e",
        color: "#00d2ff",
        backdrop: `rgba(0, 210, 255, 0.2)`,
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  _winner = async () => {
    try {
      console.log("Fetching winner...");
      const winnerAddress = await this.state.contract.methods.winner().call();

      // Suponemos que hay un método en el contrato para obtener el número del boleto ganador
      const winningTicket = await this.state.contract.methods
        .viewTickets(winnerAddress)
        .call();

      this.setState({ winnerAddress, winningTicket: winningTicket[0] }); // Mostramos el primer boleto del ganador

      Swal.fire({
        icon: "info",
        title: "Winner fetched!",
        text: `The winner's address is: ${winnerAddress}\nWinning Ticket: ${winningTicket[0]}`,
        background: "#1a1a2e",
        color: "#00d2ff",
        backdrop: `rgba(0, 210, 255, 0.2)`,
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { winnerAddress, winningTicket } = this.state;

    return (
      <div className="tokens-container">
        <Navigation account={this.state.account} />
        <div className="container">
          <h1 className="tokens-header">Lottery Winner Management</h1>

          {/* Primera fila: Generate Winner y See Winner */}
          <div className="tokens-row">
            <div className="tokens-card" style={{ marginTop: "30px", marginBottom: "30px" }}>
              <h3>Generate Winner</h3>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  this._generateWinner();
                }}
              >
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="Generate Winner"
                />
              </form>
            </div>
            <div className="tokens-card" style={{ marginTop: "30px", marginBottom: "30px" }}>
              <h3>See Winner</h3>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  this._winner();
                }}
              >
                <input
                  type="submit"
                  className="btn btn-success btn-block"
                  value="See Winner"
                />
              </form>
            </div>
          </div>

          {/* Segunda fila: Winner Details */}
          <div className="tokens-row">
            <div
              className="winner-card"
              style={{
                backgroundColor: "#0f172a", // Azul oscuro para el fondo
                color: "#00d2ff", // Azul claro para el texto
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 0 15px rgba(0, 210, 255, 0.5)", // Resaltamos con un brillo azul
                maxWidth: "80%", // Ancho adaptativo
                wordWrap: "break-word", // Evitamos desbordes de texto
                margin: "30px auto", // Centramos la tarjeta y agregamos espacio superior e inferior
                textAlign: "center", // Centrar el contenido dentro del card
              }}
            >
              {winnerAddress ? (
                <>
                  <h3
                    style={{
                      borderBottom: "2px solid #00d2ff", // Subrayado decorativo
                      paddingBottom: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    Winner Details
                  </h3>
                  <p
                    style={{
                      color: "#00d2ff", // Azul para la etiqueta Wallet Address
                    }}
                  >
                    <strong>Wallet Address:</strong>
                  </p>
                  <p
                    style={{
                      color: "white", // Blanco para el resultado de la wallet
                    }}
                  >
                    {winnerAddress}
                  </p>
                  {winningTicket && (
                    <>
                      <p
                        style={{
                          color: "#00d2ff", // Azul para la etiqueta Winning Ticket
                        }}
                      >
                        <strong>Winning Ticket:</strong>
                      </p>
                      <p
                        style={{
                          color: "white", // Blanco para el número del boleto ganador
                        }}
                      >
                        {winningTicket}
                      </p>
                    </>
                  )}
                </>
              ) : (
                <h3
                  style={{
                    borderBottom: "2px solid #00d2ff", // Subrayado decorativo
                    paddingBottom: "10px",
                    marginBottom: "15px",
                  }}
                >
                  Waiting for Winner
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Winner;
