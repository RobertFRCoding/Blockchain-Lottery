import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Title Section */}
      <div style={styles.title}>
        Welcome to the Future of{" "}
        <span style={styles.titleHighlight}>Blockchain</span>
      </div>

      {/* Lottery Call to Action Section */}
      <div style={styles.ctaContainer}>
        <p style={styles.ctaText}>
          Click to Unlock the Blockchain Future!
        </p>
        {/* Link to /tokens route */}
        <Link to="/tokens" style={styles.link}>
          <button style={styles.ctaButton}>
            Join the Lottery
          </button>
        </Link>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes glow {
            0% { text-shadow: 0 0 5px #00d2ff, 0 0 10px #00d2ff; }
            50% { text-shadow: 0 0 20px #00d2ff, 0 0 30px #00d2ff; }
            100% { text-shadow: 0 0 5px #00d2ff, 0 0 10px #00d2ff; }
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes moveGradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

// Externalized styles for cleaner JSX
const styles = {
  container: {
    background: "linear-gradient(45deg, #1a1a2e, #0f0f2a, #02020d, #1b1b37)", // Different shades of dark blue
    backgroundSize: "400% 400%",
    animation: "moveGradient 10s ease infinite", // Added the gradient movement
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "'Roboto', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#00d2ff",
    textAlign: "center",
    animation: "glow 2s infinite alternate",
    marginBottom: "20px",
  },
  titleHighlight: {
    color: "#ffffff",
  },
  ctaContainer: {
    background: "rgba(20, 25, 40, 0.85)", // Darker background for CTA
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 20px rgba(13, 242, 201, 0.7)",
    textAlign: "center",
    animation: "fadeIn 1.5s ease-out",
  },
  ctaText: {
    fontSize: "1.5rem",
    marginBottom: "30px",
  },
  ctaButton: {
    backgroundColor: "#00d2ff",
    padding: "12px 24px",
    borderRadius: "25px",
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s",
    animation: "pulse 2s infinite", // Add pulse effect to button
  },
  link: {
    textDecoration: "none", // To remove the default underline of the link
  },
};

export default Home;
