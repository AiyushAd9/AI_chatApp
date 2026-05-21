import { useState } from "react";
import axios from "axios";

function ChatBox() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    try {

      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const res = await axios.post(
        "http://localhost:5000/api/chat/send",
        {
          message: message
        },
        {
          headers: {
            token: token
          }
        }
      );

      console.log(res.data);

      setChat([...chat, res.data]);

      setMessage("");

    } catch (err) {

      console.log(err);

      alert("Message Failed");

    }

  };

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>

      <div
        style={{
          border: "1px solid gray",
          height: "400px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px"
        }}
      >

        {chat.map((c, index) => (

          <div key={index}>

            <p>
              <strong>You:</strong> {c.message}
            </p>

            <p>
              <strong>Bot:</strong> {c.response}
            </p>

            <hr />

          </div>

        ))}

      </div>

      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>
  );
}

export default ChatBox;