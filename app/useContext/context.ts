"use client";

import { createContext, useContext } from "react";

export interface UserScore {
  user: string;
  score: number;
}

const users: UserScore[] = [
  { user: "A", score: 100 },
  { user: "B", score: 92 },
  { user: "C", score: 85 },
  { user: "D", score: 78 },
  { user: "E", score: 91 },
  { user: "F", score: 64 },
  { user: "G", score: 73 },
  { user: "H", score: 88 },
  { user: "I", score: 57 },
  { user: "J", score: 69 },
  { user: "K", score: 81 },
  { user: "L", score: 95 },
  { user: "M", score: 76 },
  { user: "N", score: 83 },
  { user: "O", score: 61 },
  { user: "P", score: 89 },
  { user: "Q", score: 70 },
  { user: "R", score: 98 },
  { user: "S", score: 54 },
  { user: "T", score: 87 },
];

export const descUsers = [...users].sort((a, b) => b.score - a.score);
export const ascUsers = [...users].sort((a, b) => a.score - b.score);

export const UserScoreContext = createContext<{
  descUsers: UserScore[];
  ascUsers: UserScore[];
} | null>(null);

export const useUserScoreContext = () => {
  const context = useContext(UserScoreContext);
  if (!context) {
    throw new Error(
      "useUserScoreContext must be used within a UserScoreProvider",
    );
  }
  return context;
};
