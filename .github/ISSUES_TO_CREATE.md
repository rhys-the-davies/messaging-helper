# GitHub Issues to Create Manually

After pushing this repo to GitHub, manually create these issues to match the roadmap.

---

## Issue #1: Notion Integration

**Title:** [Feature] Notion Integration - Sync brand guidelines automatically

**Labels:** enhancement, planned, medium-complexity

**Body:**

```markdown
## Problem Statement

Many teams keep their brand guidelines in Notion. Currently, users have to manually copy content from Notion pages to markdown files in the `/content` folder every time guidelines are updated. This is:
- Time-consuming
- Error-prone (easy to forget to sync)
- Creates two sources of truth
- Reduces adoption (extra maintenance burden)

## Proposed Solution

Add Notion integration that automatically syncs brand guideline pages to the app.

**Configuration approach:**

Add Notion settings to `config.json`:
```json
{
  "notion": {
    "enabled": true,
    "apiKey": "secret_xxx",
    "pages": [
      {
        "pageId": "abc123",
        "name": "Brand Voice"
      },
      {
        "pageId": "def456",
        "name": "Messaging Guide"
      }
    ],
    "syncInterval": "1h"
  }
}
```

**User flow:**
1. User creates Notion integration at notion.so/my-integrations
2. User shares their brand guideline pages with the integration
3. User adds Notion API key and page IDs to config.json
4. App automatically fetches and converts Notion pages to markdown
5. AI uses the synced content (no manual markdown files needed)
6. Content stays in sync automatically

## Benefits

- ✅ **Single source of truth** - Guidelines live in Notion only
- ✅ **Always up to date** - Changes in Notion = instant updates in AI
- ✅ **Zero maintenance** - Set it once, forget it
- ✅ **Better adoption** - No manual copying reduces friction
- ✅ **Marketing team-friendly** - They already use Notion

## Alternatives Considered

1. **Webhook approach** - Notion sends webhook when pages update
   - Pros: Real-time updates
   - Cons: Requires webhook endpoint, more complex setup

2. **Manual "Sync Now" button** - User clicks to refresh
   - Pros: Simple to build
   - Cons: Easy to forget, not truly automated

3. **Scheduled daily sync** - Sync every 24 hours
   - Pros: Simple, low API usage
   - Cons: Updates not immediately reflected

## Use Case

**Marketing team workflow:**
1. Brand guidelines live in Notion (already there)
2. Marketing updates voice/tone principles in Notion
3. App automatically syncs (within 1 hour)
4. Sales team uses messaging helper that same day
5. AI responses reflect updated guidelines
6. No one had to manually copy anything

## Who Benefits?

- ✅ Marketing teams (maintain guidelines in Notion)
- ✅ Content writers (always have latest guidelines)
- ✅ Sales teams (messaging stays current)
- ✅ Support teams (tone updates reflected instantly)
- ✅ Anyone maintaining the app (less manual work)

## Implementation Thoughts

**Technical approach:**

1. **Notion SDK Integration**
   - Use `@notionhq/client` npm package
   - Fetch pages by ID
   - Convert Notion blocks to markdown

2. **Caching Strategy**
   - Cache Notion content in memory
   - Refresh on interval (config.syncInterval)
   - Fallback to markdown files if Notion unreachable

3. **Content Priority**
   - If Notion enabled: Use Notion content
   - If Notion disabled: Use /content/*.md files
   - Allows gradual migration or fallback

4. **Configuration**
   - Add Notion settings to config.json
   - Document how to get Notion API key
   - Document how to find page IDs

**Files to modify:**
- `lib/brand-content.ts` - Add Notion fetching logic
- `lib/notion.ts` (new) - Notion API wrapper
- `config.json` - Add Notion settings schema
- `README.md` - Document Notion setup
- `package.json` - Add @notionhq/client dependency

**API considerations:**
- Notion API rate limits: 3 requests/second
- Cache aggressively to minimize API calls
- Handle API errors gracefully

**Security:**
- Notion API key should be in environment variable (not config.json)
- Update .env.example with NOTION_API_KEY
- Document in README

## Complexity Estimate

**Medium (2-3 days)**

- 4 hours: Notion SDK integration & markdown conversion
- 4 hours: Caching & sync interval logic
- 2 hours: Configuration schema & validation
- 4 hours: Documentation & setup guide
- 2 hours: Testing & error handling

## Open Questions

1. Should sync interval be configurable or fixed?
2. How to handle Notion API failures? (Fallback to cached? Show error?)
3. Support Notion database as source (not just pages)?
4. Allow filtering/transforming content before sending to AI?

## Success Metrics

- Users with Notion integration spend < 5 minutes on setup
- Zero manual markdown copying needed after setup
- Guidelines stay in sync within configured interval
- App works offline with cached content

## Related Issues

- None yet

## References

- [Notion API Docs](https://developers.notion.com/)
- [Notion JavaScript SDK](https://github.com/makenotion/notion-sdk-js)
- [Notion Markdown Export](https://github.com/souvikinator/notion-to-md)
```

---

**After creating this issue, update ROADMAP.md to reference it:**

Change this line in ROADMAP.md:
```
**Details:** [See GitHub Issue #1](../../issues/1) for implementation discussion
```

To reference the actual issue number if different.

---

## Additional Issues to Consider Creating

- **Issue #2:** Conversation History
- **Issue #3:** Export & Share
- **Issue #4:** Dark Mode
- **Issue #5:** User Authentication

These can be created on-demand as features get prioritized.
