export function MessageForm({
  message,
  setMessage,
  sendMessage,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}) {
  return (
    <>
      {/* Input field for a new message.
       * value: The current value comes from our React state.
       * onChange: Runs whenever the user types something. It updates our message state. */}
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Your message"
      />

      {/* Send the current message to the server. */}
      <button onClick={sendMessage}>Send</button>
    </>
  );
}
