import { useEffect, useState } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { Messages } from "./components/Messages";
import { MessageForm } from "./components/MessageForm";

function App() {
  // Stores the message that is currently typed into the input field.
  const [message, setMessage] = useState("");

  // Stores all messages we have received from the server.
  const [messages, setMessages] = useState<string[]>([]);

  // Stores the current connection status.
  // socket.connected is true if we are connected and false if we are not.
  const [connected, setConnected] = useState(socket.connected);

  // Stores the room the user is currently in. Hardcoded for now, since it is only a test.
  const [room, setRoom] = useState("general");

  // useEffect runs when the App component is mounted.
  // We use it for everything related to the socket:
  //  - connect to the server
  //  - register event listeners
  //  - remove the listeners when the component is removed
  useEffect(() => {
    // Connect to the NestJS server.
    socket.connect();

    // This function runs when the socket successfully connects to the server.
    const onConnect = () => {
      setConnected(true);
    };

    // This function runs when the connection to the server is lost.
    const onDisconnect = () => {
      setConnected(false);
    };

    // This function runs whenever the server sends us a "messages" event.
    // The server sends the complete, updated array for the room,
    // so we replace our state instead of appending to it.
    const onMessages = (messages: string[]) => {
      console.log("onMessages called with:", messages); // hier
      setMessages(messages);
    };

    // Register our event listeners.
    // "connect"    → connection was established
    // "disconnect" → connection was lost
    // "message"    → the server sent a chat message
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("messages", onMessages);

    //  Cleanup function.
    //  React runs this when the component is unmounted.
    //  We remove exactly the listeners that we registered above.
    //  This prevents duplicate listeners when the component is mounted again.
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("messages", onMessages);

      // Close the socket connection.
      socket.disconnect();
    };
  }, []);

  // Joins the current room whenever it changes.
  // Runs once on mount (with the hardcoded room) and again if the user is ever able to switch rooms.
  useEffect(() => {
    socket.emit("joinRoom", room);
  }, [room]);

  // Called when the user clicks the "Send" button.
  const sendMessage = () => {
    // Do not send empty messages.
    // trim() removes spaces from the beginning and end.
    if (message.trim() === "") {
      return;
    }

    // Send the message to the NestJS server, along with the room it belongs to.
    socket.emit("message", { roomId: room, message });

    // Clear the input field after sending.
    setMessage("");
  };

  return (
    <div>
      <h1>🍅 Real-Time Chat 🍅</h1>
      {/* Show whether the socket is currently connected. */}
      <ConnectionState connected={connected} />
      <ConnectionManager />
      <br />
      <MessageForm
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
      <Messages messages={messages} />
    </div>
  );
}

export default App;
