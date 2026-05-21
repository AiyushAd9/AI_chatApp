function Message({ sender, text }) {
  const isBot = sender === "bot";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        marginBottom: "10px"
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "12px",
          borderRadius: "10px",
          background: isBot ? "#2c2c2c" : "#4cafef",
          color: "white"
        }}
      >
        <p style={{ margin: 0 }}>{text}</p>
      </div>
    </div>
  );
}

export default Message;