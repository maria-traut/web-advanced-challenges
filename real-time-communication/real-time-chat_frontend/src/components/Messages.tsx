export function Messages({ messages }: { messages: string[] }) {
  return (
    <>
      {/* Display all received messages.
       * map() creates one <li> element for each message. */}
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </>
  );
}
