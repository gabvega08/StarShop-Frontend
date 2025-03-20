"use client";

import ChatConversations from "@/components/features/user/messages/MessagesList";
import ChatInterface from "@/components/features/user/messages/MessagesWindow";

export default function ChatLayout() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen items-center justify-center  p-4">
      <div className="w-full md:w-[350px] h-[600px] rounded-2xl p-3">
        <ChatConversations />
      </div>
      <div className="w-full md:w-[700px] h-[600px] rounded-2xl p-3">
        <ChatInterface />
      </div>
    </div>
  );
}
