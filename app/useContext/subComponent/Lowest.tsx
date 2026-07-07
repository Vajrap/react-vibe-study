import { UserScore } from "../page";

type Props = {
  users: UserScore[];
};

export default function LowestScore(props: Props) {
  return (
    <ul>
      {props.users.map((userScore) => (
        <li key={userScore.user}>
          {userScore.user}: {userScore.score}
        </li>
      ))}
    </ul>
  );
}
