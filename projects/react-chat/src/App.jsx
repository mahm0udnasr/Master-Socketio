import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Send, MessageSquare } from "lucide-react";
const socket = io("http://localhost:3000");

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.off("message");
    };
  }, [messages]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMsg.trim() !== "") {
      socket.emit("message", inputMsg);
      setInputMsg("");
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-header">
        <MessageSquare />
        <h1>Chat Room</h1>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${index % 2 === 0 ? "sent" : ""}`}
          >
            <div className={`message ${index % 2 === 0 ? "sent" : "received"}`}>
              {msg}
            </div>
          </div>
        ))}
      </div>

      <form className="input-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="input-wrapper">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Type your message..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            <Send />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
