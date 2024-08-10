import { StreamSend, StreamingAdapterObserver } from "@nlux/react";

const demoProxyServerUrl = "https://gptalks.api.nlux.dev/openai/chat/stream";

export const send: StreamSend = async (
  prompt: string,
  observer: StreamingAdapterObserver
) => {
  const body = { prompt };
  const response = await fetch(demoProxyServerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.status !== 200) {
    observer.error(new Error("Failed to connect to the server"));
    return;
  }

  if (!response.body) {
    return;
  }

  const reader = response.body.getReader();
  const textDecoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    const content = textDecoder.decode(value);
    if (content) {
      observer.next(content);
    }
  }

  observer.complete();
};
