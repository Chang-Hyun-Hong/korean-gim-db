// Phase 1: 기존 site/index.html의 i18n 및 번역 매핑을 그대로 이식.
// Phase 2에서 Notion DB에 Name_EN/Review_EN 컬럼 추가 후 이 파일의 enNameMap/enReviewMap 제거 예정.

export type Lang = 'ko' | 'en';

export interface I18nStrings {
  title: string;
  subtitle: string;
  labelType: string;
  labelCook: string;
  labelSearch: string;
  searchPlaceholder: string;
  countLabel: string;
  cols: string[];
  buyBtn: string;
  filterType: [string, string][];
  filterCook: [string, string][];
}

export const i18n: Record<Lang, I18nStrings> = {
  ko: {
    title: "맛있는 김 DB",
    subtitle: "김 리뷰 데이터베이스 — 기름진 정도, 짠 정도, 총점으로 나에게 맞는 김 찾기",
    labelType: "김 종류",
    labelCook: "조리상태",
    labelSearch: "검색",
    searchPlaceholder: "이름 또는 한줄평 검색...",
    countLabel: "개 결과",
    cols: ["이름", "김 종류", "조리", "기름", "짠맛", "총점", "한줄평", "가격", "링크"],
    buyBtn: "구매",
    filterType: [["", "전체"], ["재래김", "재래김"], ["돌김", "돌김"], ["파래김", "파래김"]],
    filterCook: [["", "전체"], ["조미김", "조미김"], ["무조미김", "무조미김"]],
  },
  en: {
    title: "Korean GIM Database",
    subtitle: "Seaweed review database — Find your perfect gim by oiliness, saltiness & rating",
    labelType: "Gim Type",
    labelCook: "Seasoning",
    labelSearch: "Search",
    searchPlaceholder: "Search by name or review...",
    countLabel: " results",
    cols: ["Name", "Type", "Seasoning", "Oiliness", "Saltiness", "Rating", "Review", "Price", "Link"],
    buyBtn: "Buy",
    filterType: [["", "All"], ["재래김", "Traditional"], ["돌김", "Stone Laver"], ["파래김", "Green Laver"]],
    filterCook: [["", "All"], ["조미김", "Seasoned"], ["무조미김", "Unseasoned"]],
  },
};

// Phase 2A Task 7: 영어 매핑은 Notion `Name_EN`/`Review_EN` 컬럼으로 이전 (data.json의 name_en/review_en 사용).
// 빈 객체로 유지하는 이유: src/pages/index.astro가 아직 이 export를 import — Task 8 인덱스 리스타일 시 파일 자체 제거 예정.
export const enNameMap: Record<string, string> = {};
export const enReviewMap: Record<string, string> = {};

export const typeDisplayMap: Record<Lang, Record<string, string>> = {
  en: { "재래김": "Traditional", "돌김": "Stone Laver", "파래김": "Green Laver" },
  ko: { "재래김": "재래김", "돌김": "돌김", "파래김": "파래김" },
};

export const cookDisplayMap: Record<Lang, Record<string, string>> = {
  en: { "조미김": "Seasoned", "무조미김": "Unseasoned" },
  ko: { "조미김": "조미김", "무조미김": "무조미김" },
};
