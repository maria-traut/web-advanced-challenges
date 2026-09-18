export function ConnectionState({ connected }: { connected: boolean }) {
  return <p>Status: {connected ? "🫒 Live" : "🍋 Reconnecting ..."}</p>;
}
