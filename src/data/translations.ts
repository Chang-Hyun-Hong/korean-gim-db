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

// 개별 김의 영어 이름 매핑 (Phase 2에서 Notion Name_EN 컬럼으로 이전 예정)
export const enNameMap: Record<string, string> = {
  "별난맛김": "Byeolnanmat Gim",
  "예만구운 곱창돌김": "Yeman Roasted Gopchang Dolgim",
  "한나네김 빨강이 일반김": "Hannane Gim Red Label",
  "손김 맥반석 즉석구이김": "Songim Roasted Laver",
  "밥도둑 즉석구이김 통복시장구이김": "Babdoduk Roasted Gim",
  "광천 재래 캔김": "Gwangcheon Traditional Can Gim",
  "민속물산 솔잎김 재래김": "Minsok Solip Traditional Gim",
  "기역이미음 일월의돌김 구운 무조미김": "Kiyeokimium Roasted Unseasoned Dolgim",
  "기역이미음 일월의돌김 저염김": "Kiyeokimium Low-Salt Dolgim",
};

// 한줄평 영어 매핑 (Phase 2에서 Notion Review_EN 컬럼으로 이전 예정)
export const enReviewMap: Record<string, string> = {
  "짭짤하고 바삭한 밥반찬으로 추천": "Salty & crispy, great as a rice side dish",
  "눅눅하고 기름진 스타일 좋아하는 사람에게 추천": "For those who like soft & oily style",
  "간식으로도 밥반찬으로도 좋고 모난 것 없는 육각형 스타일의 구이김": "Great as snack & side dish. A well-rounded roasted gim",
  "간식용으로 덜 짜게 먹고 싶을 때 좋음": "Good for snacking when you want less salty",
  "그럭저럭 맛은 있으나 양이 너무 적다고 느껴짐": "Decent taste but portions feel too small",
  "짜게 먹고 싶지 않은 사람, 밥반찬으로 조금만 먹으면 되는 사람에게 적합": "For those who don't want salty, good for small rice portions",
};

export const typeDisplayMap: Record<Lang, Record<string, string>> = {
  en: { "재래김": "Traditional", "돌김": "Stone Laver", "파래김": "Green Laver" },
  ko: { "재래김": "재래김", "돌김": "돌김", "파래김": "파래김" },
};

export const cookDisplayMap: Record<Lang, Record<string, string>> = {
  en: { "조미김": "Seasoned", "무조미김": "Unseasoned" },
  ko: { "조미김": "조미김", "무조미김": "무조미김" },
};
