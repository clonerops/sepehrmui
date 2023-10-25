
import React, { useState } from 'react';

function ErrorMessageDisplay({ messages }: { messages: string[] }) {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}

function ErrorMessageContainer() {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const addMessage = (message: string) => {
    setErrorMessages([...errorMessages, message]);
    setTimeout(() => {
      removeMessage(message);
    }, 3000);
  };

  const removeMessage = (message: string) => {
    const updatedMessages = errorMessages.filter((msg) => msg !== message);
    setErrorMessages(updatedMessages);
  };

  return (
    <div>
      <button onClick={() => addMessage('Error Message 1')}>Add Message</button>
      <ErrorMessageDisplay messages={errorMessages} />
    </div>
  );
}

export default ErrorMessageContainer;
