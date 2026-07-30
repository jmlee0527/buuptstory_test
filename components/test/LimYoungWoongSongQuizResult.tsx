"use client";

import { SingerSongQuizResult } from "@/components/singer-song-quiz/SingerSongQuizResult";
import {
  LIMYOUNGWOONG_SONG_QUIZ_SIZE,
  limYoungWoongSongQuizQuestions,
  limYoungWoongSongQuizTest,
} from "@/data/limyoungwoong-song-quiz";
import type { SingerSongQuizAnswer } from "@/lib/singer-song-quiz-engine";

export function LimYoungWoongSongQuizResult({ answers }: { answers: SingerSongQuizAnswer[] | null }) {
  return (
    <SingerSongQuizResult
      answers={answers}
      test={limYoungWoongSongQuizTest}
      questions={limYoungWoongSongQuizQuestions}
      quizSize={LIMYOUNGWOONG_SONG_QUIZ_SIZE}
      resultBasePath="/limyoungwoong-song-fan-quiz/result"
      imageSrc="/tests/limyoungwoong-song-fan.png"
      imageAlt="임영웅 팬 퀴즈 결과 이미지"
      imageObjectPosition="center 22%"
      disclaimer="본 테스트는 공개된 음원·앨범 정보를 바탕으로 미미테스트가 제작한 비공식 팬 퀴즈이며 임영웅 또는 소속사의 공식 서비스가 아닙니다. 긴 가사는 제공하지 않으며 응답은 서버에 저장되지 않습니다."
    />
  );
}
