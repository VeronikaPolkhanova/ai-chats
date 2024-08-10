import { useCallback } from "react";

import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  AiChat,
  ComposerOptions,
  DisplayOptions,
  PersonaOptions,
  PreDestroyEventDetails,
  useAsStreamAdapter,
} from "@nlux/react";

import Page from "../../components/Page";
import { send } from "../../utilits/send";
import { IChat } from "../../types/types";
import classes from "./styles.module.scss";
import { chatStore } from "../../store/chatStore";
import BackButton from "../../components/BackButton";

import "@nlux/themes/nova.css";

const Chat = () => {
  let { robotId } = useParams();

  const { chats, robots } = chatStore;
  const { user }: any = useAuth0();

  const robotInfo = robots.find(({ id }) => id === robotId);
  const storageData: any = localStorage.getItem("history");
  const chatHistory = JSON.parse(storageData)?.find(
    (chat: IChat) => chat.robotId === robotId
  )?.chatHistory;

  const navigate = useNavigate();

  const onBackButton = () => {
    navigate("/");
  };

  const adapter = useAsStreamAdapter(send, []);

  const personaOptions: PersonaOptions = {
    assistant: {
      avatar: robotInfo?.avatar || "",
      name: robotInfo?.name || "Unknown robot",
      tagline: "Outsmarts Einstein and E.T",
    },
    user: user,
  };

  const composerOptions: ComposerOptions = {
    autoFocus: true,
  };

  const displayOptions: DisplayOptions = {
    width: "50%",
    height: "70vh",
    colorScheme: "light",
  };

  const onPreDestroy = useCallback(
    (preDestroyData: PreDestroyEventDetails) => {
      const initialData = storageData ? JSON.parse(storageData) : chats;
      const newChatHistory: IChat[] = initialData.map((chat: IChat) => {
        if (chat.robotId === robotId) {
          return {
            ...chat,
            lastMessageDate: preDestroyData.conversationHistory.length
              ? new Date().toLocaleTimeString()
              : "",
            chatHistory: [
              ...preDestroyData.conversationHistory.map((item) =>
                Array.isArray(item.message)
                  ? { ...item, message: item.message.join("") }
                  : item
              ),
            ],
          };
        }
        return chat;
      });
      localStorage.setItem("history", JSON.stringify(newChatHistory));
    },
    [chats, robotId, storageData]
  );

  return (
    <Page>
      <div className={classes.header}>
        <BackButton onClick={onBackButton} />
        <h2>AI {robotInfo?.name}</h2>
      </div>
      <AiChat
        adapter={adapter}
        initialConversation={chatHistory}
        personaOptions={personaOptions}
        displayOptions={displayOptions}
        composerOptions={composerOptions}
        events={{
          preDestroy: onPreDestroy,
        }}
      />
    </Page>
  );
};

export default observer(Chat);
