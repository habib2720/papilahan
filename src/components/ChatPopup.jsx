import React, { useState, useRef, useEffect } from "react";
import "./ChatPopup.css";
import { BsX } from "react-icons/bs";
import axios from "axios";

const ChatPopup = ({ isOpen, setIsOpen }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "Bot", text: "Hi! Apa yang bisa saya bantu?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  }

  const handleSend = () => {
    if (message.trim() !== "") {
      setChatHistory([...chatHistory, { sender: "You", text: message }]);
      setMessage("");

      setIsTyping(true);

      axios
        .post(
          "https://flask-docker.1p8k005tn4y0.us-south.codeengine.appdomain.cloud/response",
          { input: message }
        )
        .then((res) => {
          setIsTyping(false);
          setChatHistory((prevHistory) => [
            ...prevHistory,
            { sender: "Bot", text: res.data.response },
          ]);
        })
        .catch((err) => {
          console.error(err);
          setIsTyping(false);
          setChatHistory((prevHistory) => [
            ...prevHistory,
            { sender: "Bot", text: "Oops! Ada kesalahan, coba lagi nanti." },
          ]);
        });
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isTyping]);

  return (
    <div className="chat-popup-container">
      <div className={`chat-popup ${isOpen ? "show" : ""}`}>
        <div className="chat-header">
          <div>
            <h5 className="m-0">Pak Tan</h5>
            <span className="status-online">AI Chat</span>
          </div>
          <button className="close-btn" onClick={toggleChat}>
            <BsX size={20} />
          </button>
        </div>

        <div className="chat-body">
          <div className="chat-messages">
          {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`chat-message ${
                  chat.sender === "You" ? "sent" : "received"
                }`}
              >
                <span className="message-text">{chat.text}</span>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message received typing-indicator">
                <span>Sedang mengetik</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-btn" onClick={handleSend}>
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
