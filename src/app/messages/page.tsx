"use client";

import ChatList from "@/components/messages/MessagesList";
import ChatWindow from "@/components/messages/MessagesWindow";

export default function ChatLayout() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen items-center justify-center  p-4">
      <div className="w-full md:w-[350px] h-[600px] rounded-2xl p-3">
        <ChatList />
      </div>
      <div className="w-full md:w-[700px] h-[600px] rounded-2xl p-3">
        <ChatWindow />
      </div>
    </div>
  );
}
