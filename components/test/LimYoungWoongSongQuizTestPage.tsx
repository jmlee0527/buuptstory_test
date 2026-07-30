"use client";

import { SingerSongQuizTestPage } from "@/components/singer-song-quiz/SingerSongQuizTestPage";
import {
  LIMYOUNGWOONG_SONG_QUIZ_SIZE,
  limYoungWoongSongQuizQuestions,
  limYoungWoongSongQuizQuota,
  limYoungWoongSongQuizTest,
} from "@/data/limyoungwoong-song-quiz";

export function LimYoungWoongSongQuizTestPage() {
  return (
    <SingerSongQuizTestPage
      test={limYoungWoongSongQuizTest}
      questions={limYoungWoongSongQuizQuestions}
      quota={limYoungWoongSongQuizQuota}
      quizSize={LIMYOUNGWOONG_SONG_QUIZ_SIZE}
      resultBasePath="/limyoungwoong-song-fan-quiz/result"
      sessionKey="mimi-limyoungwoong-song-quiz-session"
      recentKey="mimi-limyoungwoong-song-quiz-recent"
      eyebrow="LIM YOUNG WOONG SONG FAN QUIZ"
      loadingText="임영웅 노래 퀴즈를 구성하는 중..."
    />
  );
}
