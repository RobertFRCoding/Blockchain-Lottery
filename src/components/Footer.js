import React from "react";

const MyFooter = () => (
  <footer
    style={{
      width: "100%", // Asegura que ocupe todo el ancho de la pantalla
      position: "relative",
      background: "linear-gradient(45deg, #1a1a2e, #0f0f2a, #02020d, #1b1b37)", // Tonos azules oscuros
      backgroundSize: "400% 400%", // Para el movimiento del gradiente
      animation: "moveGradient 10s ease infinite", // Animación de gradiente
      color: "#fff",
      fontFamily: "'Roboto', sans-serif",
      padding: "3rem 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
      boxSizing: "border-box", // Para evitar problemas con márgenes/paddings externos
    }}
  >
    <div
      style={{
        textAlign: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "1rem",
        letterSpacing: "0.1rem",
        animation: "glow 2s infinite", // Efecto de resplandor
      }}
    >
      <span style={{ color: "#00d2ff" }}>robertfuentes26@gmail.com</span>
    </div>

    <div
      style={{
        width: "90%",
        maxWidth: "1200px",
        background: "rgba(15, 15, 45, 0.9)", // Fondo oscuro con opacidad
        borderRadius: "15px",
        padding: "2.5rem",
        textAlign: "center",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(5px)",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#00d2ff" }}>
        ¡Trabajemos juntos para crear la próxima DApp innovadora!
      </h2>
      <p style={{ fontSize: "1.2rem", lineHeight: "1.6", color: "#e0e0e0" }}>
        Si tienes una idea revolucionaria o quieres llevar tu proyecto al mundo
        blockchain, ¡estoy aquí para ayudarte! Contacta conmigo y hablemos de
        cómo puedo dar vida a tu visión.
      </p>
    </div>

    <div
      style={{
        marginTop: "2rem",
        textAlign: "center",
        animation: "pulse 3s infinite", // Efecto de pulso en el texto
        color: "#00d2ff",
        fontSize: "1.2rem",
      }}
    >
      Creemos juntos el futuro.
    </div>

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

        @keyframes pulse {
          0% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.8; transform: scale(1); }
        }
      `}
    </style>
  </footer>
);

export default MyFooter;
