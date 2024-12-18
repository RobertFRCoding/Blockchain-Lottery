import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = ({ account }) => {
  const words = ["Tokens", "Lottery", "Winner"];

  return (
    <nav
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        background: "linear-gradient(135deg, #1a1a2e, #0f0c29)",
        animation: "moveGradient 10s infinite linear",
        zIndex: 1000,
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#00d2ff",
          animation: "glow 2s infinite",
        }}
      >
        <span style={{ color: "#ffffff" }}>L</span>ottery
      </div>

      {/* Navigation Links */}
      <Nav
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
        }}
      >
        {words.map((item, index) => (
          <Nav.Link
            as={Link}
            to={`/${item.toLowerCase()}`}
            key={index}
            style={{
              position: "relative",
              color: "#fff",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "2px",
              display: "inline-block",
              padding: "0",
              margin: "0",
              cursor: "pointer",
              transition: "color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease",
            }}
          >
            {Array.from(item).map((letter, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  position: "relative",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#fff",
                  marginLeft: i === 0 ? 0 : "5px",
                  animation: `neonLetter ${item.length * 0.2 + i * 0.2}s linear infinite`,
                }}
              >
                {letter}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    zIndex: -1,
                    pointerEvents: "none",
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                    animation: `letterPulse ${item.length * 0.3 + i * 0.3}s linear infinite`,
                  }}
                />
              </span>
            ))}
          </Nav.Link>
        ))}
      </Nav>

      {/* Wallet Address */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(15, 15, 45, 0.9)",
          padding: "0.5rem 1rem",
          borderRadius: "20px",
          boxShadow: "0 0 10px rgba(13, 242, 201, 0.5)",
          fontSize: "1rem",
          color: "#fff",
        }}
      >
        <span style={{ marginRight: "1rem", color: "#00d2ff" }}>Wallet:</span>
        {account
          ? `${account.slice(0, 5)}...${account.slice(38, 42)}`
          : "Connect Wallet"}
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes glow {
            0% { text-shadow: 0 0 5px #00d2ff, 0 0 10px #00d2ff; }
            50% { text-shadow: 0 0 20px #00d2ff, 0 0 30px #00d2ff; }
            100% { text-shadow: 0 0 5px #00d2ff, 0 0 10px #00d2ff; }
          }

          @keyframes moveGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes neonLetter {
            0% { text-shadow: 0 0 5px #00d2ff, 0 0 10px #00d2ff; }
            50% { text-shadow: 0 0 15px #00d2ff, 0 0 25px #00d2ff; }
            100% { text-shadow: 0 0 5px #00d2ff, 0 0 10px #00d2ff; }
          }

          @keyframes letterPulse {
            0% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 0.6; }
          }
        `}
      </style>
    </nav>
  );
};

export default Navigation;
