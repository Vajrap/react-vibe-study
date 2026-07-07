import Highest from "./subComponent/Highest";
import LowestScore from "./subComponent/Lowest";
import { DemoPanel, LessonPage, LessonSection } from "../components/LessonPage";

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

export default function UseContextPage() {
  const descUsers = [...users].sort((a, b) => b.score - a.score);
  const ascUsers = [...users].sort((a, b) => a.score - b.score);

  return (
    <LessonPage
      title="useContext"
      subtitle="This lesson is different because creating context works best as a coding session."
    >
      <LessonSection title="Score lists">
        <DemoPanel>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-3 text-xl font-semibold">Highest scores</h2>
              <Highest users={descUsers} />
            </div>
            <div>
              <h2 className="mb-3 text-xl font-semibold">Lowest scores</h2>
              <LowestScore users={ascUsers} />E
            </div>
          </div>
        </DemoPanel>
      </LessonSection>
    </LessonPage>
  );
}
