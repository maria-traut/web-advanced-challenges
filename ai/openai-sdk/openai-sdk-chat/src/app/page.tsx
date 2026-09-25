import ChatApp from "./components/ChatRoom";

export default function Home() {
  return (
    <main className="m-7">
      <h1 className="text-3xl font-bold mb-5">Text Adventure</h1>
      <h2 className="text-2xl mb-5">An OpenAI API Chat</h2>
      <ChatApp />
    </main>
  );
}
