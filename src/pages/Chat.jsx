import "./chat.css";
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
      message:
        "Hello, I am a medical advisor! Feel free to ask me any health-related questions!",
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
      content: `Follow these principles:
        1. You are not a doctor. Please do not say you are a doctor.
        2. You are a helpful assistant that gives medical advise, talk as if you are talking to a patient.
        3. Only answer health related questions. If it's not health related say you are just a health advise doctor.
        4. If you don't know the answer, say you don't know the answer.
        5. Do not give any information about procedures and service features that do not pertain to health advise.
        6. Don't answer any math questions. If they ask about a procedure, say you are just a health advise doctor.`,
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo-1106",
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
        console.log("data", data);
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
    <body>
      <header
        className="text-center flex items-center justify-center mb-4 mt-10"
        style={{ paddingTop: "100px" }}
      >
        <span className="text-6xl text-#4CA9EE font-custom">HealthGPT</span>
        <img src="https://icongr.am/entypo/leaf.svg?size=50&color=5ecd81"></img>
      </header>
      <div className="relative h-[450px] w-[600px] m-auto">
        <MainContainer>
          <ChatContainer className="mt-4">
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
              className="mb-4"
            />
          </ChatContainer>
        </MainContainer>
      </div>
      <footer className="text-[1rem] text-[#A8B9E3] text-center mt-3">
        <p>Your own personal medical advisor.</p>
        <div className="text-[.8rem] w-[700px] m-auto mt-8 mb-8">
          <p className="text-[#8081ac]">
            <span className="font-bold">Disclaimer:</span> The information
            provided on this website is for general informational purposes only
            and is not intended as a substitute for professional medical advice,
            diagnosis, or treatment. Always seek the advice of your physician or
            other qualified health provider with any questions you may have
            regarding a medical condition.
          </p>
        </div>
      </footer>
    </body>
  );
}

export default App;
