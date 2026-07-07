"use client";

import HighestScore from "./subComponent/Highest";
import LowestScore from "./subComponent/Lowest";
import { DemoPanel, LessonPage, LessonSection } from "../components/LessonPage";
import { ascUsers, descUsers, UserScoreContext } from "./context";

export default function UseContextPage() {
  return (
    <UserScoreContext.Provider value={{ descUsers, ascUsers }}>
      <LessonPage
        title="useContext"
        subtitle="This lesson is different because creating context works best as a coding session."
      >
        <LessonSection title="Score lists">
          <DemoPanel>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="mb-3 text-xl font-semibold">Highest scores</h2>
                <HighestScore />
              </div>
              <div>
                <h2 className="mb-3 text-xl font-semibold">Lowest scores</h2>
                <LowestScore />
              </div>
            </div>
          </DemoPanel>
        </LessonSection>
      </LessonPage>
    </UserScoreContext.Provider>
  );
}
