import React from "react";

interface ChatMessageProps {
  type: string;
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, message }) => {
  return (
    <div className={type}>
      <div className="message">
        <p>{message}</p>
      </div>
    </div>
  );
};
export default ChatMessage;
