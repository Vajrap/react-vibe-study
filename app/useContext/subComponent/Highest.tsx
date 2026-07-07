"use client";

import { useUserScoreContext } from "../context";

export default function HighestScore() {
  const users = useUserScoreContext().descUsers;

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
