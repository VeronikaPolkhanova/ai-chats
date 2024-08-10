import { useEffect } from "react";

import { observer } from "mobx-react-lite";

import Page from "../../components/Page";
import classes from "./styles.module.scss";
import { chatStore } from "../../store/chatStore";

const Chats = () => {
  const { chats, robots } = chatStore;
  const chatList = chats.map((chat) => {
    const robotInfo = robots.find((robot) => robot.id === chat.robotId);
    return { ...chat, ...robotInfo };
  });

  useEffect(() => {
    const response: any = localStorage.getItem("history");
    if (response && !!response.length) {
      chatStore.chats = JSON.parse(response);
    }
  }, []);

  return (
    <Page>
      <h1>AI chats</h1>
      <ul className={classes.chats}>
        {chatList.map(({ id, name, avatar, chatHistory, lastMessageDate }) => (
          <li key={id}>
            <img src={avatar} alt="avatar" />
            <div className={classes.textContainer}>
              <a href={`/${id}`}>{`AI ${name}`}</a>
              <p className={classes.lastMessage}>
                {chatHistory[chatHistory.length - 1]?.message}
              </p>
              <p className={classes.time}>{lastMessageDate}</p>
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default observer(Chats);
