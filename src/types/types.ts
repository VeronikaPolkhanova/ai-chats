import { ChatItem } from "@nlux/react";

export interface IChat {
  lastMessageDate: string;
  robotId: string;
  chatHistory: ChatItem[];
}
