from groq import Groq

def plan_crawl(url: str, goal: str, api_key: str):
    client = Groq(api_key=api_key)

    prompt = f"""
You are a web scraping agent.

Website URL:
{url}

User goal:
{goal}

Decide:
1. Whether the site is multi-page
2. What types of links to follow (pagination, categories, etc.)
3. Max crawl depth (1–3)
4. What content is important

Respond ONLY in JSON like:
{{
  "follow_links": true,
  "link_patterns": ["page=", "next", "/category/"],
  "max_depth": 2
}}
"""

    res = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
    )

    return res.choices[0].message.content
