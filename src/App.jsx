import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

function App() {
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "Hello, feel free to ask me any health-related questions!",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; // all old messages + new messages

    // update our messages state
    setMessages(newMessages);

    // set a typing indicator (GPT is typing)
    setTyping(true);

    // process message to chatGPT (send to server and see response)
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // chatMessages { sender: "user" or "ChatGPT", message: "Message Content"}
    // apiMessages { role: "user" or "assistant, content: "Message content" }

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return {
        role: role,
        content: messageObject.message,
      };
    });

    const systemMessage = {
      role: "system",
      content:
        "Talk as if you are a professional doctor and you are speaking to a patient.  Only answer health related questions. If it's not health related say you are just a doctor.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_OPENAI_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
      });
    setTyping(false);
  }

  return (
    <>
      <body>
        <header className="text-[5rem] text-[#A8B9E3] text-center">
          HealthGPT
        </header>
        <div className="relative h-[700px] w-[600px] m-auto">
          <MainContainer>
            <ChatContainer>
              <MessageList
                typingIndicator={
                  typing ? (
                    <TypingIndicator content="HealthGPT is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                attachButton={false}
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
        <footer className="text-[1rem] text-[#A8B9E3] text-center ">
          <p>Your own personal medical advisor.</p>
          <div className="text-[.8rem] w-[700px] m-auto mt-8 mb-8">
            <p className="text-[#8081ac]">
              <span className="font-bold">Disclaimer:</span> The information
              provided on this website is for general informational purposes
              only and is not intended as a substitute for professional medical
              advice, diagnosis, or treatment. Always seek the advice of your
              physician or other qualified health provider with any questions
              you may have regarding a medical condition.
            </p>
          </div>
        </footer>
      </body>
    </>
  );
}

export default App;
