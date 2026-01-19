import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def extract_links(soup, base_url, patterns):
    links = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        full_url = urljoin(base_url, href)
        if any(p in href.lower() for p in patterns):
            links.add(full_url)
    return links


def scrape_page(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    res = requests.get(url, headers=headers, timeout=15)
    res.raise_for_status()

    soup = BeautifulSoup(res.text, "html.parser")

    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    return {
        "headings": [h.get_text(strip=True) for h in soup.find_all(["h1","h2","h3"])],
        "paragraphs": [p.get_text(strip=True) for p in soup.find_all("p")],
        "soup": soup
    }
