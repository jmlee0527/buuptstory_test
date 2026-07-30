"use client";

import { SingerSongQuizTestPage } from "@/components/singer-song-quiz/SingerSongQuizTestPage";
import {
  YOUNGTAK_SONG_QUIZ_SIZE,
  youngtakSongQuizQuestions,
  youngtakSongQuizQuota,
  youngtakSongQuizTest,
} from "@/data/youngtak-song-quiz";

export function YoungtakSongQuizTestPage() {
  return (
    <SingerSongQuizTestPage
      test={youngtakSongQuizTest}
      questions={youngtakSongQuizQuestions}
      quota={youngtakSongQuizQuota}
      quizSize={YOUNGTAK_SONG_QUIZ_SIZE}
      resultBasePath="/youngtak-song-fan-quiz/result"
      sessionKey="mimi-youngtak-song-quiz-session"
      recentKey="mimi-youngtak-song-quiz-recent"
      eyebrow="YOUNGTAK SONG FAN QUIZ"
      loadingText="영탁 노래 퀴즈를 구성하는 중..."
    />
  );
}
