# Brand Messaging Helper

> An open-source template that helps teams create brand-consistent content with AI assistance.

Deploy your own instance in minutes, customize it with your brand guidelines, and help your team write content that stays on-brand every time.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/brand-messaging-helper&env=ANTHROPIC_API_KEY&envDescription=Get%20your%20API%20key%20from%20Anthropic&envLink=https://console.anthropic.com/settings/keys)

## What This Does

This is a simple chat interface powered by Claude (Anthropic's AI) that helps your team create content that aligns with your brand guidelines. It reads your brand voice, tone, and messaging guidelines from markdown files and uses them to provide AI-powered writing assistance.

**Perfect for:**
- Marketing teams ensuring consistent messaging
- Customer support writing on-brand responses
- Product teams crafting aligned announcements
- Anyone who needs help staying on-brand

## Features

- ✅ **Easy Setup**: Deploy in 5 minutes with just an API key
- ✅ **Config-Driven**: All customization via `config.json` and markdown files
- ✅ **No Code Changes Needed**: Edit content, not code
- ✅ **Clean Chat Interface**: Simple, responsive UI that works everywhere
- ✅ **Streaming Responses**: Fast, real-time AI assistance
- ✅ **Private**: Your own instance, your own API key, your own data

## Quick Start (5 Minutes)

### 1. Deploy to Vercel

Click the "Deploy with Vercel" button above or:

1. Fork this repository
2. Go to [Vercel](https://vercel.com) and import your fork
3. Add your `ANTHROPIC_API_KEY` environment variable
4. Deploy!

### 2. Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/settings/keys)
2. Sign up or log in
3. Create a new API key
4. Add it to your Vercel environment variables

**Cost**: Claude API is pay-as-you-go. Typical usage costs a few dollars per month for small teams.

### 3. Customize Your Brand

After deployment, clone your repo and customize:

```bash
git clone your-repo-url
cd brand-messaging-helper
```

**Edit `config.json`:**
```json
{
  "companyName": "Acme Inc",
  "primaryColor": "#FF6B35",
  "tagline": "Write content that sounds like Acme",
  ...
}
```

**Edit content files in `/content`:**
- `brand-voice.md` - Your voice and tone guidelines
- `messaging-guide.md` - Your core messaging and positioning

Push your changes:
```bash
git add .
git commit -m "Customize for Acme Inc"
git push
```

Vercel will automatically redeploy with your changes.

## Customization Guide

### config.json

This file controls all the UI and branding:

| Field | Description | Example |
|-------|-------------|---------|
| `companyName` | Your company name (appears in header) | `"Acme Inc"` |
| `primaryColor` | Brand color in hex | `"#FF6B35"` |
| `tagline` | Subtitle under the header | `"Write content that sounds like Acme"` |
| `welcomeMessage` | Initial message from the assistant | `"I'm here to help you write on-brand content"` |
| `suggestions` | Example use cases shown on home screen | Array of `{icon, text, description}` |

**Example:**
```json
{
  "companyName": "Acme Inc",
  "primaryColor": "#FF6B35",
  "tagline": "Write content that sounds like Acme",
  "welcomeMessage": "I'm here to help you create content that matches Acme's voice and values.",
  "suggestions": [
    {
      "icon": "✉️",
      "text": "Customer emails",
      "description": "Friendly and helpful"
    },
    {
      "icon": "📱",
      "text": "Social media",
      "description": "Bold and engaging"
    }
  ]
}
```

### Content Files

Add markdown files to the `/content` folder. The AI reads ALL `.md` files in this folder.

**Recommended structure:**

1. **brand-voice.md** - Voice, tone, personality
   - What's your personality? (e.g., professional yet friendly)
   - Voice principles with examples
   - Words you use vs. words you avoid
   - Tone shifts by context (support, marketing, etc.)

2. **messaging-guide.md** - Core messaging
   - Mission/vision
   - Value propositions
   - How to describe your product/service
   - Target audience personas
   - Key messages by scenario

**Tips for great brand guidelines:**
- ✅ **Be specific**: "Use 'help' instead of 'assist'" beats "be simple"
- ✅ **Show examples**: Include ✅ good and ❌ bad examples
- ✅ **Be concise**: The AI reads all of it—keep it focused
- ✅ **Update regularly**: Guidelines should evolve with your brand

**Example snippet:**
```markdown
## Voice Principles

### 1. Clear, Not Clever

We value clarity over creativity. Say what you mean directly.

**Examples:**
- ✅ "Start your free trial"
- ❌ "Embark on your journey to success"

### 2. Confident, Not Arrogant

We know our product works, but we don't brag.

**Examples:**
- ✅ "We help 10,000 teams ship faster"
- ❌ "We're the world's #1 platform"
```

## Local Development

Want to run it locally?

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your API key to .env.local
# ANTHROPIC_API_KEY=your_key_here

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com/settings/keys) |

## How It Works

1. You describe what you need to write
2. The app loads your brand guidelines from `/content`
3. Claude reads your guidelines and helps you write on-brand content
4. You get fast, streaming responses that match your brand voice

**The AI receives:**
- All markdown files from `/content` as context
- Your company name from `config.json`
- Instructions to help match your brand voice

## Architecture

- **Framework**: Next.js 14 (App Router)
- **AI**: Anthropic Claude Sonnet 4.5 via streaming API
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (or any Next.js host)

```
/app
  /api
    /chat         → Claude API integration
    /config       → Serves config.json
  page.tsx        → Main chat interface
  layout.tsx      → App layout
  globals.css     → Styles
/content          → Your brand guidelines (markdown)
/lib
  brand-content.ts → Loads markdown files
  config.ts       → Loads config.json
config.json       → Customization (colors, text, etc.)
```

## FAQ

**Q: How much does this cost?**
A: You pay for the Claude API usage (pay-as-you-go). Typical small team usage is $2-10/month. See [Anthropic pricing](https://www.anthropic.com/pricing).

**Q: Is my data private?**
A: Yes! This is your own instance with your own API key. Your brand guidelines and conversations stay with you. Read [Anthropic's privacy policy](https://www.anthropic.com/legal/privacy).

**Q: Can I use a different AI model?**
A: The code uses Claude Sonnet 4.5. You can edit `app/api/chat/route.ts` to use a different Claude model (like Haiku for faster/cheaper responses).

**Q: Can I customize the UI?**
A: Yes! Edit `app/page.tsx` for the chat interface. The codebase is designed to be simple and hackable.

**Q: Can I add authentication?**
A: Yes! Consider adding [NextAuth.js](https://next-auth.js.org/) or [Clerk](https://clerk.dev/) for user authentication.

**Q: My API key isn't working**
A: Make sure you've:
1. Created an API key at [console.anthropic.com](https://console.anthropic.com/settings/keys)
2. Added credits to your Anthropic account
3. Set the `ANTHROPIC_API_KEY` environment variable in Vercel
4. Redeployed after adding the variable

**Q: Can I use this for my company?**
A: Yes! This is open source (MIT license). Deploy it, customize it, use it internally or with clients.

## Examples of Good Brand Guidelines

Want inspiration? Here are examples of clear, effective brand guidelines:

**Voice Principle Example:**
```markdown
### Human, Not Robotic

Write like a real person. Use contractions, start sentences with "And" or "But" if it sounds natural.

- ✅ "We're here to help. And we mean it."
- ❌ "We are available to provide assistance to you."
```

**Word Swap Example:**
```markdown
| ❌ Don't Use | ✅ Use Instead |
|-------------|---------------|
| utilize     | use           |
| assistance  | help          |
| commence    | start         |
| request     | ask           |
```

**Tone by Context Example:**
```markdown
### For Support Emails
- Acknowledge the problem first
- Be empathetic, not defensive
- Give clear next steps
- Example: "We understand this is frustrating. Here's what we'll do..."
```

## Contributing

Found a bug? Have an idea? See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to contribute to this project.

## License

MIT License - feel free to use this for personal or commercial projects.

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/brand-messaging-helper/issues)
- **Docs**: This README
- **Claude API Docs**: [docs.anthropic.com](https://docs.anthropic.com)

## Credits

Built and maintained by [Studio Rhys](https://studio-rhys.com) using [Claude Code](https://docs.anthropic.com/en/docs/build-with-claude/claude-code).

---

Built with [Next.js](https://nextjs.org/) and [Claude](https://www.anthropic.com/claude)
