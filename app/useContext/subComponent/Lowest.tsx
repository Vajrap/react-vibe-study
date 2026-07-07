"use client";

import { useUserScoreContext } from "../context";

export default function LowestScore() {
  const users = useUserScoreContext().ascUsers;

  return (
    <ul>
      {users.map((userScore) => (
        <li key={userScore.user}>
          {userScore.user}: {userScore.score}
        </li>
      ))}
    </ul>
  );
}
