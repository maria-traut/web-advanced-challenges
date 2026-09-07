"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <h2>Could not load this delivery.</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </>
  );
}
