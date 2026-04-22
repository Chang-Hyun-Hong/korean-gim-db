"""
Notion DB에서 김 데이터를 가져와 JSON으로 저장하는 스크립트.
GitHub Actions에서 주기적으로 실행됨.
"""
import os
import json
import re
import requests

NOTION_API_KEY = os.environ["NOTION_API_KEY"]
DATABASE_ID = os.environ["NOTION_DATABASE_ID"]

HEADERS = {
    "Authorization": f"Bearer {NOTION_API_KEY}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
}


def get_all_pages():
    """Notion DB에서 모든 페이지를 가져온다 (페이지네이션 포함)."""
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    pages = []
    payload = {"page_size": 100}

    while True:
        resp = requests.post(url, headers=HEADERS, json=payload)
        resp.raise_for_status()
        data = resp.json()
        pages.extend(data["results"])
        if not data.get("has_more"):
            break
        payload["start_cursor"] = data["next_cursor"]

    return pages


def extract_text(prop):
    """Notion rich_text/title 속성에서 텍스트 추출."""
    if not prop:
        return ""
    for item in prop:
        return item.get("plain_text", "")
    return ""


def extract_number(prop):
    """Notion number 속성에서 숫자 추출."""
    if prop is None:
        return None
    return prop


def extract_select(prop):
    """Notion select 속성에서 값 추출."""
    if not prop:
        return ""
    return prop.get("name", "")


def extract_url(prop):
    """Notion url 속성에서 URL 추출."""
    return prop or ""


def extract_checkbox(prop):
    """Notion checkbox 속성에서 값 추출."""
    return prop or False


def stars_to_num(stars_str):
    """⭐️ 개수를 숫자로 변환."""
    if not stars_str:
        return 0
    return len(re.findall(r"⭐️", stars_str))


def parse_page(page):
    """Notion 페이지를 김 데이터 dict로 변환."""
    props = page["properties"]

    # 각 속성 이름에 맞게 추출
    name = extract_text(props.get("Name", {}).get("title", []))
    desc = extract_text(props.get("Description", {}).get("rich_text", []))
    review = extract_text(props.get("한줄평", {}).get("rich_text", []))
    score = extract_select(props.get("총점", {}).get("select"))
    price_raw = extract_number(props.get("구매가격", {}).get("number"))
    link = extract_url(props.get("구매링크", {}).get("url"))
    oil = extract_number(props.get("기름진 정도(0~10)", {}).get("number"))
    salt = extract_number(props.get("짠 정도(0~10)", {}).get("number"))
    gim_type = extract_select(props.get("김 종류", {}).get("select"))
    cook_state = extract_select(props.get("조리상태", {}).get("select"))
    cut = extract_select(props.get("등분 여부", {}).get("select"))

    # 가격: number 타입 → 표시용 텍스트 생성
    price_num = int(price_raw) if price_raw else 0
    price_text = f"₩{price_num:,}" if price_num else ""

    return {
        "name": name,
        "type": gim_type,
        "cook": cook_state,
        "oil": oil,
        "salt": salt,
        "score": score,
        "scoreNum": stars_to_num(score),
        "price": price_text,
        "priceNum": price_num,
        "review": review,
        "desc": desc,
        "link": link or "",
        "cut": cut,
    }


def main():
    pages = get_all_pages()
    items = [parse_page(p) for p in pages]
    # 이름 기준 정렬
    items.sort(key=lambda x: x["name"])

    output_path = os.path.join(os.path.dirname(__file__), "..", "public", "data.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)

    print(f"Fetched {len(items)} items → data.json")


if __name__ == "__main__":
    main()
