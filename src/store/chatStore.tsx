import { makeAutoObservable } from "mobx";
import { IChat } from "../types/types";

class ChatStore {
  _robots = [
    {
      id: "marsel",
      name: "Marsel",
      avatar:
        "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg",
    },
    {
      id: "mary",
      name: "Mary",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/024/183/541/non_2x/female-avatar-blonde-woman-portrait-illustration-of-a-female-character-in-a-modern-color-style-vector.jpg",
    },
    {
      id: "kate",
      name: "Kate",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/024/183/507/non_2x/female-avatar-portrait-of-brunette-woman-with-long-straight-hair-illustration-of-a-female-character-in-a-modern-color-style-vector.jpg",
    },
  ];
  _chats: IChat[] = [
    {
      robotId: "marsel",
      lastMessageDate: "",
      chatHistory: [],
    },
    {
      robotId: "mary",
      lastMessageDate: "",
      chatHistory: [],
    },
    {
      robotId: "kate",
      lastMessageDate: "",
      chatHistory: [],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  get chats() {
    return this._chats;
  }

  set chats(data) {
    this._chats = data;
  }

  get robots() {
    return this._robots;
  }
}

export const chatStore = new ChatStore();
