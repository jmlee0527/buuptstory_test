from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch


LANGUAGES = {
    "en": "eng_Latn",
    "ja": "jpn_Jpan",
    "zh": "zho_Hans",
}

DEFAULT_MODELS = {
    "en": "Helsinki-NLP/opus-mt-ko-en",
    "ja": "Helsinki-NLP/opus-tatoeba-en-ja",
    "zh": "Helsinki-NLP/opus-mt-en-zh",
}

MANUAL_TRANSLATIONS = {
    "en": {
        "| 이직 의향 테스트 결과": "| Turnover Intention Test Result",
        "| MBTI 성격유형 테스트 결과": "| MBTI Personality Type Test Result",
        "✓ ms 단위 정밀 측정": "✓ Precise measurement in milliseconds",
        "연애 관계 만족도 테스트": "Relationship Satisfaction Test",
        "대인관계 능력 테스트": "Interpersonal Skills Test",
        "자아탄력성 테스트": "Ego Resilience Test",
        "세븐틴 팬 퀴즈": "SEVENTEEN Fan Quiz",
        "스트레이 키즈 팬 퀴즈": "Stray Kids Fan Quiz",
        "BTS 정국 팬 퀴즈": "BTS Jung Kook Fan Quiz",
        "리오넬 메시 팬 퀴즈": "Lionel Messi Fan Quiz",
        "영탁 팬 퀴즈": "Youngtak Fan Quiz",
        "임영웅 팬 퀴즈": "Lim Young Woong Fan Quiz",
        "미미테스트": "Mimi Test",
        "미미": "Mimi",
        "테스트": "Test",
        "나를 발견하는 순간": "A moment to discover yourself",
        "ATEEZ 팬 퀴즈": "ATEEZ Fan Quiz",
        "아스날 팬 퀴즈": "Arsenal Fan Quiz",
        "프로미스나인 팬 퀴즈": "fromis_9 Fan Quiz",
        "BTS 팬 퀴즈": "BTS Fan Quiz",
    },
    "ja": {
        "| 이직 의향 테스트 결과": "| 転職意向テスト結果",
        "| MBTI 성격유형 테스트 결과": "| MBTI性格タイプテスト結果",
        "✓ ms 단위 정밀 측정": "✓ ミリ秒単位の精密測定",
        "연애 관계 만족도 테스트": "恋愛関係満足度テスト",
        "대인관계 능력 테스트": "対人関係能力テスト",
        "자아탄력성 테스트": "自我レジリエンステスト",
        "세븐틴 팬 퀴즈": "SEVENTEENファンクイズ",
        "스트레이 키즈 팬 퀴즈": "Stray Kidsファンクイズ",
        "BTS 정국 팬 퀴즈": "BTS ジョングク ファンクイズ",
        "리오넬 메시 팬 퀴즈": "リオネル・メッシ ファンクイズ",
        "영탁 팬 퀴즈": "ヨンタク ファンクイズ",
        "임영웅 팬 퀴즈": "イム・ヨンウン ファンクイズ",
        "미미테스트": "ミミテスト",
        "미미": "ミミ",
        "테스트": "テスト",
        "나를 발견하는 순간": "自分を発見する瞬間",
        "ATEEZ 팬 퀴즈": "ATEEZファンクイズ",
        "아스날 팬 퀴즈": "アーセナル ファンクイズ",
        "프로미스나인 팬 퀴즈": "fromis_9ファンクイズ",
        "BTS 팬 퀴즈": "BTSファンクイズ",
        "남자 이상형 테스트": "男性の理想タイプテスト",
        "목": "木",
        "상대가 내 마음을 몰라준다고 서운해하기 전에, 말로 표현해보세요. 통찰은 당신의 능력이지 상대의 의무가 아니에요.": "相手が自分の気持ちを分かってくれないと悲しむ前に、言葉で伝えてみましょう。察する力はあなたの能力であり、相手の義務ではありません。",
    },
    "zh": {
        "| 이직 의향 테스트 결과": "| 离职意向测试结果",
        "| MBTI 성격유형 테스트 결과": "| MBTI人格类型测试结果",
        "✓ ms 단위 정밀 측정": "✓ 毫秒级精确测量",
        "연애 관계 만족도 테스트": "恋爱关系满意度测试",
        "대인관계 능력 테스트": "人际交往能力测试",
        "자아탄력성 테스트": "自我韧性测试",
        "세븐틴 팬 퀴즈": "SEVENTEEN粉丝问答",
        "스트레이 키즈 팬 퀴즈": "Stray Kids粉丝问答",
        "BTS 정국 팬 퀴즈": "BTS田柾国粉丝问答",
        "리오넬 메시 팬 퀴즈": "利昂内尔·梅西粉丝问答",
        "영탁 팬 퀴즈": "Youngtak粉丝问答",
        "임영웅 팬 퀴즈": "林英雄粉丝问答",
        "미미테스트": "Mimi Test",
        "미미": "Mimi",
        "테스트": "Test",
        "나를 발견하는 순간": "发现自我的瞬间",
        "ATEEZ 팬 퀴즈": "ATEEZ粉丝问答",
        "아스날 팬 퀴즈": "阿森纳粉丝问答",
        "프로미스나인 팬 퀴즈": "fromis_9粉丝问答",
        "BTS 팬 퀴즈": "BTS粉丝问答",
        "굴무침": "凉拌牡蛎",
        "부카요 사카": "布卡约·萨卡",
        "뽀얀 사골 국물": "浓白牛骨汤",
        "젓가락 워킹": "筷子走路挑战",
        "카카": "卡卡",
        "프리미엄 지향": "高端品质导向",
    },
}

def clean_translation(text: str, locale: str, source: str = "") -> str:
    latin_stage_name = re.fullmatch(r"[가-힣\s·]+ \(([A-Za-z0-9.' -]+)\)", source)
    if latin_stage_name:
        return latin_stage_name.group(1)
    text = re.sub(r"\s+", " ", text).strip()
    if locale in {"ja", "zh"}:
        cjk = r"\u3040-\u30ff\u3400-\u9fff"
        text = re.sub(fr"(?<=[{cjk}])\s+(?=[{cjk}])", "", text)
        text = re.sub(fr"\s+([。、，！？：；])", r"\1", text)
    return text


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--locale", choices=LANGUAGES, required=True)
    parser.add_argument("--model")
    parser.add_argument("--batch-size", type=int, default=128)
    parser.add_argument("--token-budget", type=int, default=2048)
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()
    model_name = args.model or DEFAULT_MODELS[args.locale]

    root = Path(__file__).resolve().parents[1]
    source = json.loads((root / "locales/content-ko.json").read_text())
    input_texts = source
    if args.locale in {"ja", "zh"}:
        input_texts = json.loads((root / "locales/content-en.json").read_text())
    output_path = root / f"locales/content-{args.locale}.json"
    existing = (
        json.loads(output_path.read_text())
        if output_path.exists() and not args.overwrite
        else {}
    )
    pending = [
        (key, input_texts[key])
        for key in source
        if not existing.get(key)
    ]
    if not pending:
        existing.update(MANUAL_TRANSLATIONS[args.locale])
        ordered = {
            text: clean_translation(existing.get(text, text), args.locale, text)
            for text in source
        }
        output_path.write_text(json.dumps(ordered, ensure_ascii=False, indent=2) + "\n")
        print(f"{args.locale} 콘텐츠 번역 완료: {len(ordered)}개")
        return

    is_nllb = "nllb" in model_name.lower()
    tokenizer = AutoTokenizer.from_pretrained(
        model_name,
        **({"src_lang": "kor_Hang" if args.locale == "en" else "eng_Latn"} if is_nllb else {}),
    )
    device = "mps" if torch.backends.mps.is_available() else "cpu"
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    model.to(device)
    model.eval()
    forced_bos_token_id = (
        tokenizer.convert_tokens_to_ids(LANGUAGES[args.locale])
        if is_nllb
        else None
    )

    pending.sort(key=lambda item: len(item[1]))
    batches: list[list[tuple[str, str]]] = []
    batch: list[tuple[str, str]] = []
    longest = 0
    for key, text in pending:
        next_longest = max(longest, len(text))
        if batch and (
            len(batch) >= args.batch_size
            or next_longest * (len(batch) + 1) > args.token_budget
        ):
            batches.append(batch)
            batch = []
            longest = 0
        batch.append((key, text))
        longest = max(longest, len(text))
    if batch:
        batches.append(batch)

    completed = 0
    for batch_index, batch_items in enumerate(batches):
        batch = [text for _, text in batch_items]
        encoded = tokenizer(
            batch,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=512,
        ).to(device)
        output_length = min(192, max(12, int(encoded.input_ids.shape[1] * 1.5)))
        with torch.inference_mode():
            generation_options = {
                "max_new_tokens": output_length,
                "num_beams": 1,
            }
            if forced_bos_token_id is not None:
                generation_options["forced_bos_token_id"] = forced_bos_token_id
            generated = model.generate(**encoded, **generation_options)
        translated = tokenizer.batch_decode(generated, skip_special_tokens=True)
        for (key, _), result in zip(batch_items, translated):
            existing[key] = clean_translation(result, args.locale, key)

        completed += len(batch)
        if batch_index % 10 == 0:
            output_path.write_text(
                json.dumps(existing, ensure_ascii=False, indent=2) + "\n"
            )
            print(f"{args.locale}: {completed}/{len(pending)}", flush=True)

    existing.update(MANUAL_TRANSLATIONS[args.locale])
    ordered = {
        text: clean_translation(existing.get(text, text), args.locale, text)
        for text in source
    }
    output_path.write_text(json.dumps(ordered, ensure_ascii=False, indent=2) + "\n")
    print(f"{args.locale} 콘텐츠 번역 완료: {len(ordered)}개")


if __name__ == "__main__":
    main()
