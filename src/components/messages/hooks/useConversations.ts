import { useState } from "react";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timeAgo: string;
  isOnline?: boolean;
  avatar?: string;
}

export function useConversations() {
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Thanks for the quick deliv...",
      timeAgo: "2m ago",
      isOnline: true,
      avatar: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Sarah Smith",
      lastMessage: "Is this item still available?",
      timeAgo: "1h ago",
      avatar: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Mike Johnson",
      lastMessage: "Perfect, I'll place the order",
      timeAgo: "3h ago",
      avatar: "/placeholder.svg",
    },
  ]);

  return { conversations };
}
