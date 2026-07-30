"use client";

import { useEffect } from "react";
import { loadContentDictionary, type ContentDictionary } from "@/lib/content-i18n";
import type { Locale } from "@/lib/i18n";

const translatedAttributes = ["aria-label", "placeholder", "title", "alt"] as const;
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const lastTranslation = new WeakMap<Node, string>();
const lastAttributeTranslations = new WeakMap<Element, Map<string, string>>();

type PreparedDictionary = {
  exact: ContentDictionary;
  fragmentsByCharacter: Map<string, Array<[string, string]>>;
};

function prepareDictionary(dictionary: ContentDictionary): PreparedDictionary {
  const fragmentsByCharacter = new Map<string, Array<[string, string]>>();
  for (const [source, target] of Object.entries(dictionary)) {
    if (source === target || source.length < 2) continue;
    const firstKoreanCharacter = source.match(/[가-힣]/)?.[0];
    if (!firstKoreanCharacter) continue;
    const fragments = fragmentsByCharacter.get(firstKoreanCharacter) ?? [];
    fragments.push([source, target]);
    fragmentsByCharacter.set(firstKoreanCharacter, fragments);
  }
  for (const fragments of fragmentsByCharacter.values()) {
    fragments.sort(([left], [right]) => right.length - left.length);
  }
  return { exact: dictionary, fragmentsByCharacter };
}

function translateText(value: string, dictionary: PreparedDictionary) {
  const leadingWhitespace = value.match(/^\s*/)?.[0] ?? "";
  const trailingWhitespace = value.match(/\s*$/)?.[0] ?? "";
  const normalized = value.trim().replace(/\s+/g, " ");
  if (!normalized) return value;

  const exact = dictionary.exact[normalized];
  if (exact) return `${leadingWhitespace}${exact}${trailingWhitespace}`;

  let translated = normalized;
  const characters = new Set(translated.match(/[가-힣]/g) ?? []);
  for (const character of characters) {
    for (const [source, target] of dictionary.fragmentsByCharacter.get(character) ?? []) {
      if (translated.includes(source)) translated = translated.replaceAll(source, target);
    }
  }
  return `${leadingWhitespace}${translated}${trailingWhitespace}`;
}

function shouldIgnore(node: Node) {
  const element = node instanceof Element ? node : node.parentElement;
  return Boolean(element?.closest("script, style, noscript, [data-no-content-translation]"));
}

function translateTextNode(node: Text, locale: Locale, dictionary?: PreparedDictionary) {
  if (shouldIgnore(node)) return;
  const current = node.data;
  const previousTranslation = lastTranslation.get(node);
  if (!originalText.has(node) || (previousTranslation !== undefined && current !== previousTranslation)) {
    originalText.set(node, current);
  }
  const source = originalText.get(node) ?? current;
  const next = locale === "ko" || !dictionary ? source : translateText(source, dictionary);
  if (next !== current) node.data = next;
  lastTranslation.set(node, next);
}

function translateElementAttributes(
  element: Element,
  locale: Locale,
  dictionary?: PreparedDictionary,
) {
  if (shouldIgnore(element)) return;
  const originals = originalAttributes.get(element) ?? new Map<string, string>();
  const previousTranslations = lastAttributeTranslations.get(element) ?? new Map<string, string>();
  for (const attribute of translatedAttributes) {
    const current = element.getAttribute(attribute);
    if (current === null) continue;
    const previousTranslation = previousTranslations.get(attribute);
    if (!originals.has(attribute) || (previousTranslation !== undefined && current !== previousTranslation)) {
      originals.set(attribute, current);
    }
    const source = originals.get(attribute) ?? current;
    const next = locale === "ko" || !dictionary ? source : translateText(source, dictionary);
    if (next !== current) element.setAttribute(attribute, next);
    previousTranslations.set(attribute, next);
  }
  originalAttributes.set(element, originals);
  lastAttributeTranslations.set(element, previousTranslations);
}

function translateSubtree(root: Node, locale: Locale, dictionary?: PreparedDictionary) {
  if (root instanceof Text) {
    translateTextNode(root, locale, dictionary);
    return;
  }
  if (root instanceof Element) translateElementAttributes(root, locale, dictionary);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let node = walker.nextNode();
  while (node) {
    if (node instanceof Text) translateTextNode(node, locale, dictionary);
    else if (node instanceof Element) translateElementAttributes(node, locale, dictionary);
    node = walker.nextNode();
  }
}

export function ContentTranslator({ locale }: { locale: Locale }) {
  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | undefined;

    async function start() {
      const dictionary = locale === "ko"
        ? undefined
        : prepareDictionary(await loadContentDictionary(locale));
      if (cancelled) return;

      translateSubtree(document.body, locale, dictionary);
      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "characterData") {
            translateTextNode(mutation.target as Text, locale, dictionary);
          } else if (mutation.type === "attributes" && mutation.target instanceof Element) {
            translateElementAttributes(mutation.target, locale, dictionary);
          } else {
            mutation.addedNodes.forEach((node) => translateSubtree(node, locale, dictionary));
          }
        }
      });
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: [...translatedAttributes],
      });
    }

    void start();
    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [locale]);

  return null;
}
