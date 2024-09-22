"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import {
  fetchCustomersData,
  fetchUserChatConversation,
  fetchUserChatConversationIds,
  sendUserChatMessage,
} from "@/app/generalFunctions/apiDataFetches/dashboard/functions";
import "@/app/ui/styles/scss/components/dashboard/sub-sections/messages.scss";

export default function Messages() {
  const { user } = useUser();
  const [chatConversationRefs, setChatConversationRefs] = useState<{
    labels: string[];
    ids: string[];
  }>();
  const [conversationSettings, setConversationSettings] = useState<any>();
  const [selectedConversationIndex, setSelectedConversationIndex] =
    useState<number>();
  const [conversationMessages, setConversationMessages] =
    useState<
      { message: string; from: string; timestamp: string; is: string }[]
    >();
  const [conversationIntervalId, setConversationIntervalId] =
    useState<NodeJS.Timeout>();
  const chatConversationElementRef = useRef<HTMLDivElement>(null);

  const handleConversationRefsUpdate = (user: any, callback?: Function) => {
    fetchUserChatConversationIds(user.sub ?? "", "labels").then((data: any) => {
      if (data.conversation_ids && data.conversation_ids.length > 0) {
        setChatConversationRefs(() => {
          return {
            labels: data.conversation_labels,
            ids: data.conversation_ids,
          };
        });

        if (callback) {
          callback(data);
        }
      }
    });
  };

  const handleSendMessageRecipientsList = (search_term: string) => {
    const recipientsListEl = document.getElementsByClassName(
      "kst-dashboard-sidebar-send-message-recipients-list"
    )[0] as HTMLDivElement;

    fetchCustomersData({
      ids: true,
      username: true,
      chat_name: true,
      search_in: "username,chat_name",
      search_term,
    }).then((data) => {
      const customersData = data["customers"];

      const recipientsListItems = customersData
        .filter((customerData: any) => customerData.id !== user?.sub)
        .map((customerData: any, customerDataIndex: number) => {
          const listItemEl = document.createElement("div");
          listItemEl.className =
            "kst-dashboard-sidebar-send-message-recipients-list-item";
          listItemEl.setAttribute(
            "key",
            `kst-dashboard-sidebar-send-message-recipients-list-item-${customerDataIndex}`
          );
          listItemEl.innerHTML = `${
            customerData.chat_name
              ? customerData.chat_name
              : customerData.username
              ? customerData.username
              : `Random Chatter ${customerDataIndex}`
          }`;
          listItemEl.onclick = (e) => {
            const nameHiddenInputEl = document.getElementById(
              "kst-dashboard-sidebar-send-message-recipient-name"
            ) as HTMLInputElement;
            const nameVisibleInputEl = document.getElementsByClassName(
              "kst-dashboard-sidebar-send-message-recipient-name"
            )[0] as HTMLInputElement;
            const recipientsListEl = document.getElementsByClassName(
              "kst-dashboard-sidebar-send-message-recipients-list"
            )[0] as HTMLDivElement;

            nameHiddenInputEl.value = customerData.id;
            nameVisibleInputEl.value =
              customerData.chat_name ??
              customerData.username ??
              `Random Chatter ${customerDataIndex}`;
            recipientsListEl.style.display = "none";
          };

          return listItemEl;
        });

      while (recipientsListEl.firstChild) {
        recipientsListEl.removeChild(recipientsListEl.lastChild as ChildNode);
      }

      recipientsListItems.forEach(
        (recipientListItem: any, recipientListItemIndex: number) => {
          recipientsListEl.appendChild(recipientListItem);
        }
      );

      recipientsListEl.style.display = "flex";
    });
  };

  const toggleSendMessageOptions = () => {
    const toggleButton = document.getElementsByClassName(
      "kst-dashboard-messages-sidebar-send-message-toggle"
    )[0] as HTMLDivElement;
    const conversationOptionsEl = document.getElementsByClassName(
      "kst-dashboard-messages-sidebar-send-message-options"
    )[0] as HTMLDivElement;
    const currentRecipientOptionsDisplay = conversationOptionsEl.style.display;

    if (
      currentRecipientOptionsDisplay === "none" ||
      currentRecipientOptionsDisplay === ""
    ) {
      toggleButton.innerText = "Cancel";
      toggleButton.classList.add("cancel");
      conversationOptionsEl.style.display = "flex";
    } else {
      toggleButton.innerText = "Start New Chat";
      toggleButton.classList.remove("cancel");
      conversationOptionsEl.style.display = "none";
    }
  };

  const handleChatDisplayUpdate = (data: any, user: any) => {
    const fetchedConversationSettings = data["settings"];
    const fetchedConversationChatters = fetchedConversationSettings["chatters"];
    const onlyMessageTexts = data["messages"].map(
      (messageData: any, messageDataIndex: number) => {
        const chatter_settings =
          fetchedConversationChatters[messageData.sender_id] || [];
        const from = chatter_settings["name"] ?? `Chatter ${messageDataIndex}`;
        const message = messageData.message;
        const timestamp = messageData.timestamp;
        const is = messageData.sender_id === user.sub ? "me" : "them";

        return {
          from,
          message,
          timestamp,
          is,
        };
      }
    );

    setConversationSettings(fetchedConversationSettings);
    setConversationMessages(onlyMessageTexts);

    if (chatConversationElementRef.current) {
      chatConversationElementRef.current.style.display = "flex";
    }
  };

  const handleMessageSubmission = async () => {
    const canSendMessage =
      user &&
      user.sub &&
      chatConversationRefs &&
      (selectedConversationIndex || selectedConversationIndex === 0);

    if (canSendMessage) {
      const conversationId =
        chatConversationRefs.ids[selectedConversationIndex];
      const senderId = user.sub ?? "";
      const messageInputElement = document.getElementsByClassName(
        "kst-dashboard-chat-conversation-input-message"
      )[0] as unknown as HTMLInputElement;

      const messageValue = messageInputElement.value;
      const name = (
        document.getElementsByClassName(
          "kst-dashboard-chat-conversation-input-name"
        )[0] as unknown as HTMLInputElement
      ).value;

      const conversationDetails = await sendUserChatMessage(
        conversationId,
        messageValue,
        senderId,
        name
      );

      messageInputElement.value = "";

      handleChatDisplayUpdate(conversationDetails, user);
    }
  };

  const handleSelectingChatConversation = (conversationIndex: number) => {
    if (user) {
      fetchUserChatConversation(
        user.sub ?? "",
        chatConversationRefs?.ids[conversationIndex] ?? ""
      ).then((data) => {
        handleChatDisplayUpdate(data, user);

        const conversationIntervalId = setInterval(() => {
          fetchUserChatConversation(
            user.sub ?? "",
            chatConversationRefs?.ids[conversationIndex] ?? ""
          ).then((data) => {
            handleChatDisplayUpdate(data, user);
          });
        }, 1500);

        setConversationIntervalId((prevConversationIntervalId) => {
          if (prevConversationIntervalId) {
            clearInterval(prevConversationIntervalId);
          }

          return conversationIntervalId;
        });

        setSelectedConversationIndex(conversationIndex);
      });
    }
  };

  useEffect(() => {
    if (user) {
      handleConversationRefsUpdate(user);
    }
  }, [user, user?.sub]);

  useEffect(() => {
    return () => {
      setConversationIntervalId((prevConversationIntervalId) => {
        if (prevConversationIntervalId) {
          clearInterval(prevConversationIntervalId);
        }
        return prevConversationIntervalId;
      });
    };
  }, [selectedConversationIndex]);

  return (
    <div id="kst-dashboard-messages-section">
      <div className="kst-dashboard-messages-sidebar">
        <div className="kst-dashboard-messages-sidebar-header">
          Chat Messages
        </div>

        <div className="kst-dashboard-messages-sidebar-list">
          {chatConversationRefs ? (
            chatConversationRefs.ids.map((id, idIndex) => (
              <div
                key={`kst-dashboard-messages-sidebar-list-item-${idIndex}`}
                className={`kst-dashboard-messages-sidebar-list-item button ${
                  selectedConversationIndex === idIndex ? "active" : ""
                }`}
                onClick={() => {
                  handleSelectingChatConversation(idIndex);
                }}
              >
                {chatConversationRefs.labels[idIndex]}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

        <div className="kst-dashboard-messages-sidebar-send-message">
          <div
            className="kst-dashboard-messages-sidebar-send-message-toggle"
            onClick={(e) => {
              toggleSendMessageOptions();
            }}
          >
            Start New Chat
          </div>

          <div className="kst-dashboard-messages-sidebar-send-message-options">
            <input
              className="kst-dashboard-messages-sidebar-send-message-chat-label"
              placeholder="Chat Title"
            />
            <div className="kst-dashboard-messages-sidebar-send-message-recipient">
              <input
                type="hidden"
                id="kst-dashboard-sidebar-send-message-recipient-name"
              />
              <input
                placeholder="Member Search"
                type="text"
                className="kst-dashboard-sidebar-send-message-recipient-name"
                onChange={(e) => {
                  const recipientNameInputEl = e.target as HTMLInputElement;
                  const recipientsListEl = document.getElementsByClassName(
                    "kst-dashboard-sidebar-send-message-recipients-list"
                  )[0] as HTMLDivElement;
                  const search_term = recipientNameInputEl.value.toLowerCase();

                  console.log({ search_term });

                  if (search_term) {
                    handleSendMessageRecipientsList(search_term);
                  } else if (!search_term) {
                    recipientsListEl.style.display = "none";
                  }
                }}
              />

              <div
                className="kst-dashboard-sidebar-send-message-toggle-recipients-list"
                onClick={(e) => {
                  const recipientsListEl = document.getElementsByClassName(
                    "kst-dashboard-sidebar-send-message-recipients-list"
                  )[0] as HTMLDivElement;
                  const currentDisplay =
                    recipientsListEl.style.display ?? "none";
                  const recipientNameInputEl = document.getElementsByClassName(
                    "kst-dashboard-sidebar-send-message-recipient-name"
                  )[0] as HTMLInputElement;

                  if (currentDisplay === "none") {
                    if (!recipientNameInputEl.value) {
                      handleSendMessageRecipientsList("");
                    } else {
                      recipientsListEl.style.display = "flex";
                    }
                  } else {
                    recipientsListEl.style.display = "none";
                  }
                }}
              ></div>

              <div className="kst-dashboard-sidebar-send-message-recipients-list"></div>
            </div>

            <input
              placeholder="Chat Name"
              className="kst-dashboard-messages-sidebar-send-message-conversation-name"
              defaultValue={user?.chatName as string | undefined}
            />

            <textarea
              className="kst-dashboard-messages-sidebar-send-message-note"
              placeholder="Add Message Here"
            ></textarea>

            <div
              className="kst-dashboard-messages-sidebar-send-message-button"
              onClick={async (e) => {
                const chatTitleEl = document.getElementsByClassName(
                  "kst-dashboard-messages-sidebar-send-message-chat-label"
                )[0] as HTMLInputElement;
                const chatTitle = chatTitleEl.value;
                const userId = user?.sub ?? "";
                const userChatName =
                  (user?.chatName as string) ?? (user?.name as string) ?? "";
                const recipientNameInputEl = document.getElementsByClassName(
                  "kst-dashboard-sidebar-send-message-recipient-name"
                )[0] as HTMLInputElement;
                const recipientIdEl = document.getElementById(
                  "kst-dashboard-sidebar-send-message-recipient-name"
                ) as HTMLInputElement;
                const recipientId = recipientIdEl.value;
                const messageEl = document.getElementsByClassName(
                  "kst-dashboard-messages-sidebar-send-message-note"
                )[0] as HTMLTextAreaElement;
                const message = messageEl.value;

                if (userId && recipientId && message && chatTitle) {
                  const chatConversationData = await sendUserChatMessage(
                    null,
                    message,
                    userId,
                    userChatName,
                    recipientId,
                    chatTitle
                  );

                  console.log({ chatConversationData });

                  handleChatDisplayUpdate(chatConversationData, user);
                  handleConversationRefsUpdate(user, (data: any) => {
                    const newConversationIndex =
                      data.conversation_ids.length - 1;

                    const conversationIntervalId = setInterval(() => {
                      fetchUserChatConversation(
                        user?.sub ?? "",
                        chatConversationRefs?.ids[newConversationIndex] ?? ""
                      );
                    }, 1500);

                    setConversationIntervalId((prevConversationIntervalId) => {
                      if (prevConversationIntervalId) {
                        clearInterval(prevConversationIntervalId);
                      }

                      return conversationIntervalId;
                    });

                    setSelectedConversationIndex(newConversationIndex);
                  });
                  toggleSendMessageOptions();

                  recipientIdEl.value = "";
                  recipientNameInputEl.value = "";
                  messageEl.value = "";
                  chatTitleEl.value = "";
                } else {
                  console.log("Some fields are missing!");
                }
              }}
            >
              SEND
            </div>
          </div>
        </div>
      </div>

      <div
        ref={chatConversationElementRef}
        className="kst-dashboard-chat-conversation"
      >
        <div className="kst-dashboard-chat-conversation-header">
          {selectedConversationIndex || selectedConversationIndex === 0
            ? `${chatConversationRefs?.labels[selectedConversationIndex]}`
            : ""}
        </div>

        <div className="kst-dashboard-chat-conversation-display">
          {conversationMessages ? (
            conversationMessages.map((messageData, messageIndex) =>
              messageData.is === "me" ? (
                <div
                  key={`kst-dashboard-chat-conversation-display-message-${messageIndex}`}
                  className={`kst-dashboard-chat-conversation-display-message-container`}
                >
                  <div className="kst-dashboard-chat-conversation-display-message-header">{`[${messageData.timestamp}] ${messageData.from}`}</div>

                  <div className="kst-dashboard-chat-conversation-display-message">
                    {messageData.message}
                  </div>
                </div>
              ) : (
                <div
                  key={`kst-dashboard-chat-conversation-display-message-${messageIndex}`}
                  className={`kst-dashboard-chat-conversation-display-message-container right`}
                >
                  <div className="kst-dashboard-chat-conversation-display-message-header">{`${messageData.from} [${messageData.timestamp}]`}</div>

                  <div className="kst-dashboard-chat-conversation-display-message">
                    {messageData.message}
                  </div>
                </div>
              )
            )
          ) : (
            <></>
          )}
        </div>

        <div
          className="kst-dashboard-chat-conversation-input"
          onKeyDown={(event) => {
            const keyName = event.key;

            if (keyName === "Enter") {
              handleMessageSubmission();
            }
          }}
        >
          <input
            className="kst-dashboard-chat-conversation-input-name"
            type="text"
            defaultValue={`${
              user && user.sub && conversationSettings
                ? conversationSettings.chatters[user.sub].name
                : ""
            }`}
          />

          <input
            className="kst-dashboard-chat-conversation-input-submit"
            type="button"
            value="SEND"
            onClick={handleMessageSubmission}
          />

          <textarea
            className="kst-dashboard-chat-conversation-input-message"
            placeholder="Type a message..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
