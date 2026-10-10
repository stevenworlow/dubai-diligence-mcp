# Dubai Diligence MCP Server

Ask ChatGPT or Claude about the Dubai property market and get answers from the **Dubai Land
Department registered record**, not from asking prices and not from a guess.

No API key. No sign-up. No installation.

```
https://dubaidiligence.com/api/mcp
```

Add that URL as a remote MCP server in any MCP-compatible client.

---

## Why this exists

Every price you see advertised in Dubai is an *asking* price. The portals' inventory comes from
agents, so they structurally cannot tell you what a home actually sold for. The Land Department
publishes what it sold for, but its own portal puts a CAPTCHA on every query and offers no bulk
download.

This server puts the registered record one question away.

## The split nobody gives you free

**74% of registered Dubai home sales are off-plan.** So the single blended median that every data
source publishes is mostly an off-plan price wearing a neutral label.

Palm Jumeirah, last 12 months of registered sales:

| | Median AED/sqft |
|---|---|
| Ready | 2,790 |
| Off-plan | 5,483 |
| **Blended, as usually published** | **3,645** |

A buyer of a ready apartment is shown a figure 31% above their market. A buyer off-plan is shown
one far below theirs. **The same number is wrong for both of them, in opposite directions.**

`dubai_price_split` returns both sides, free and without a subscription. PropertyIndex carries an
"Off-plan : ready" ratio behind its Pro tier at AED 500 a month; this gives you the actual price on
each side instead of the ratio, and costs nothing.

## Tools

| Tool | Answers |
|---|---|
| `dubai_community_prices` | Median registered price per sqft, 12-month sales, gross yield and off-plan share for a named community |
| `dubai_price_split` | The same community split **ready vs off-plan** and **apartment vs villa**, with the blended figure beside them |
| `dubai_compare_areas` | Several communities side by side |
| `dubai_house_price_index` | The Dubai Diligence Index: mix-adjusted monthly house price index, base 2023 = 100, plus the series |
| `dubai_top_yields` | Communities ranked by gross rental yield from registered Ejari rent contracts |
| `dubai_broker_check` | Whether a named broker holds a current Dubai Land Department licence, and the transactions the register attributes to them |

Read only. There is no tool here that writes anything.

## Setup

**Claude Desktop / Claude.ai** — add a custom connector with the URL above.

**Cline, Cursor, Windsurf and most clients** — add to your MCP settings:

```json
{
  "mcpServers": {
    "dubai-diligence": {
      "url": "https://dubaidiligence.com/api/mcp"
    }
  }
}
```

**Anything else** — it is plain JSON-RPC 2.0 over HTTP POST, protocol version `2025-06-18`, and it
negotiates older versions. Try it with curl:

```bash
curl -s -X POST https://dubaidiligence.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## What the numbers mean

- **Homes only.** Land, whole buildings, offices, shops and hotel inventory are excluded, because
  somebody asking about a community is asking about homes. They are real markets with real prices;
  they are simply not the market the question is about.
- **Sales only.** Mortgage and gift registrations are excluded. A mortgage records a loan, not a
  price, and a gift is often nominal. They are about one registration in four.
- **Gross yield**, from registered Ejari rent contracts against registered sale prices. Service
  charges, agency fees and vacancy are not deducted.
- **As registered.** These are facts from the public record, not an assessment or a valuation by
  Dubai Diligence. We do not publish forecasts, because a forecast is an opinion and the whole
  claim of this dataset is that it only contains what actually happened.

## Also free, if you would rather have the files

- Every community as CSV or JSON, CC BY 4.0: <https://dubaidiligence.com/data>
- The full index series: <https://dubaidiligence.com/dubai-house-price-index>

## Licence and attribution

Data is derived from Dubai Land Department public records and is free to use, including
commercially, under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Please attribute to
**Dubai Diligence** and link <https://dubaidiligence.com>.

This repository is MIT licensed.
