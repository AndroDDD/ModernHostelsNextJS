"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

import { updateCustomerData } from "@/app/generalFunctions/apiDataFetches/dashboard/functions";
import "@/app/ui/styles/scss/components/dashboard/sub-sections/settings.scss";

export default function Settings() {
  const { user } = useUser();
  const username = user?.name as string | undefined;
  const chatName = user?.chatName as string | undefined;
  const email = user?.email as string | undefined;

  return (
    <div id="kst-dashboard-settings-section">
      {user ? (
        <>
          <div className="kst-dashboard-settings-header">
            <div
              className="kst-dashboard-settings-update-button"
              onClick={async (e) => {
                const usernameInputEl = document.getElementsByClassName(
                  "kst-dashboard-settings-field-input username"
                )[0] as HTMLInputElement;
                const username = usernameInputEl.value;
                const chatNameInputEl = document.getElementsByClassName(
                  "kst-dashboard-settings-field-input chat-name"
                )[0] as HTMLInputElement;
                const chatName = chatNameInputEl.value;
                const emailInputEl = document.getElementsByClassName(
                  "kst-dashboard-settings-field-input email"
                )[0] as HTMLInputElement;
                const email = emailInputEl.value;

                console.log({ username, chatName, email });

                const updatedCustomerData = await updateCustomerData({
                  id: user.sub ?? "",
                  username,
                  chat_name: chatName,
                  email,
                });

                const updatedCustomerProfile =
                  updatedCustomerData["customer_data"]["profile"];

                user.name = updatedCustomerProfile["username"];
                user.chatName = updatedCustomerProfile["chat_name"];
                user.email = updatedCustomerProfile["email"];
              }}
            >
              Update Profile
            </div>
          </div>

          <div className="kst-dashboard-settings-fields">
            <div className="kst-dashboard-settings-field">
              <label className="kst-dashboard-settings-field-label">
                Username:
              </label>

              <input
                className="kst-dashboard-settings-field-input username"
                defaultValue={username}
              />
            </div>

            <div className="kst-dashboard-settings-field">
              <label className="kst-dashboard-settings-field-label">
                Chat Name:
              </label>

              <input
                className="kst-dashboard-settings-field-input chat-name"
                defaultValue={chatName}
              />
            </div>

            <div className="kst-dashboard-settings-field">
              <label className="kst-dashboard-settings-field-label">
                Email:
              </label>

              <input
                className="kst-dashboard-settings-field-input email"
                defaultValue={email}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
