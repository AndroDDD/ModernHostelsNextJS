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
                const updateButtonEl = e.currentTarget;
                updateButtonEl.style.pointerEvents = "none";

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
                const updateResponseEl = document.getElementsByClassName(
                  "kst-dashboard-settings-update-response"
                )[0] as HTMLDivElement;

                const updatedCustomerData = await updateCustomerData({
                  id: user.sub ?? "",
                  username,
                  chat_name: chatName,
                  email,
                });

                const updatedCustomerProfile =
                  updatedCustomerData["customer_data"]["profile"];

                if (
                  updatedCustomerData["error"] ||
                  updatedCustomerData["errorCode"]
                ) {
                  updateResponseEl.innerText =
                    "An error occurred while updating the profile. Please try again later.";
                  updateResponseEl.style.display = "flex";

                  setTimeout(() => {
                    updateResponseEl.style.display = "none";
                    updateButtonEl.style.pointerEvents = "unset";
                  });
                  return;
                }

                user.name = updatedCustomerProfile["username"];
                user.chatName = updatedCustomerProfile["chat_name"];
                user.email = updatedCustomerProfile["email"];

                usernameInputEl.value = updatedCustomerProfile["username"];
                chatNameInputEl.value = updatedCustomerProfile["chat_name"];
                emailInputEl.value = updatedCustomerProfile["email"];

                updateResponseEl.innerText = "Profile updated successfully!";
                updateResponseEl.style.display = "flex";

                setTimeout(() => {
                  updateResponseEl.style.display = "none";
                  updateButtonEl.style.pointerEvents = "unset";
                }, 2000);
              }}
            >
              Update Profile
            </div>

            <div className="kst-dashboard-settings-update-response"></div>
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
