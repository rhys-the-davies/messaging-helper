# First User Guide: Deploying Your Brand Messaging Helper

This guide walks you through becoming the first real user of this template. Plan for **2-3 hours total** (most of it gathering content).

---

## Phase 1: Preparation (30-45 minutes)

### What You Need to Have Ready

#### 1. **Company Branding Basics**
- [ ] Company name (full legal name + how you refer to yourselves)
- [ ] Primary brand color (hex code - e.g., `#FF6B35`)
- [ ] Tagline or positioning statement
- [ ] Logo or brand guide PDF (for reference)

**Where to find it:**
- Brand guidelines document
- Website footer/header
- Marketing deck
- Ask your marketing team

#### 2. **Brand Voice & Tone Guidelines**

Gather existing documentation about:
- [ ] Brand personality traits (e.g., "professional yet approachable")
- [ ] Voice principles with examples
- [ ] Words/phrases you use vs. avoid
- [ ] Tone differences by context (support, marketing, social)

**Where to find it:**
- Brand style guide
- Content guidelines document
- Editorial style guide
- Marketing wiki or Notion
- Email templates (for tone examples)

**If you don't have formal guidelines:**
- Review 5-10 recent marketing emails
- Look at website copy
- Read recent blog posts
- Note patterns in language, tone, and style

#### 3. **Core Messaging**

Document or gather:
- [ ] Mission statement
- [ ] Value propositions (3-5 key benefits)
- [ ] Product/service description (elevator pitch)
- [ ] Target audience personas
- [ ] How you talk about competitors (if applicable)

**Where to find it:**
- About page on website
- Sales deck
- Marketing one-pager
- Product marketing docs

#### 4. **Technical Setup**

- [ ] Anthropic API account
  - Go to [console.anthropic.com](https://console.anthropic.com)
  - Sign up (or log in)
  - Add $10-20 in credits (enough for testing + first month)
  - Create an API key (Settings → API Keys)
  - **Save this key somewhere safe** (you'll need it for deployment)

- [ ] GitHub account (free)
  - If you don't have one: [github.com/signup](https://github.com/signup)

- [ ] Vercel account (free)
  - Go to [vercel.com/signup](https://vercel.com/signup)
  - Sign up with your GitHub account

---

## Phase 2: Repository Setup (15 minutes)

### Step 1: Fork the Repository

1. **Go to the template repository**
   - Navigate to the GitHub repo for this template

2. **Fork it**
   - Click the "Fork" button (top right)
   - Give it a new name: `[company-name]-messaging-helper`
   - Example: `acme-messaging-helper`
   - Make it **private** if you want to keep brand guidelines confidential
   - Click "Create fork"

3. **Clone to your computer**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

### Step 2: Install Dependencies

```bash
npm install
```

This will install Next.js, Anthropic SDK, and other dependencies.

---

## Phase 3: Customization (45-60 minutes)

### Step 1: Update `config.json`

Open `config.json` in your editor and customize:

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
      "description": "Helpful and professional"
    },
    {
      "icon": "📢",
      "text": "Product updates",
      "description": "Clear and exciting"
    },
    {
      "icon": "📱",
      "text": "Social posts",
      "description": "Engaging and authentic"
    },
    {
      "icon": "💬",
      "text": "Support responses",
      "description": "Empathetic and solution-focused"
    },
    {
      "icon": "📝",
      "text": "Blog posts",
      "description": "Informative and conversational"
    },
    {
      "icon": "🎯",
      "text": "Ad copy",
      "description": "Punchy and benefit-driven"
    }
  ]
}
```

**Customization tips:**
- **companyName**: Use how you refer to yourselves (might not be full legal name)
- **primaryColor**: Get exact hex from brand guidelines or use a color picker on your logo
- **tagline**: Keep it under 60 characters, focus on the benefit
- **suggestions**: Pick 6 real use cases your team will have (customize icons, text, descriptions)

### Step 2: Update `content/brand-voice.md`

Replace the template with your actual brand voice guidelines.

**Structure to follow:**

```markdown
# Brand Voice & Tone Guidelines

## Our Personality

[Describe your brand personality - 3-5 traits]

Example:
- **Professional yet approachable**: We're experts but we explain things clearly
- **Optimistic**: We focus on solutions and possibilities
- **Direct**: We get to the point and respect people's time

## Voice Principles

### 1. [First Principle Name]

**Be:** [What to do]

**Don't be:** [What to avoid]

**Examples:**
- ✅ Good: "[Actual example from your brand]"
- ❌ Bad: "[Counter-example to avoid]"

[Repeat for each principle - aim for 3-5 principles]

## Words We Love

[List 15-20 words/phrases that capture your brand]

## Words We Avoid

[List 10-15 words/phrases that don't fit your brand, with reasons]

## Tone by Context

### For Customer Support
[How tone should shift - 2-3 sentences + example]

### For Marketing
[How tone should shift - 2-3 sentences + example]

### For Product Announcements
[How tone should shift - 2-3 sentences + example]
```

**Tips:**
- **Use real examples** from your actual content
- **Be specific**: "Use 'help' instead of 'assist'" beats "be simple"
- **Keep it under 200 lines** - the AI reads all of it
- **Delete the template instructions** at the top

### Step 3: Update `content/messaging-guide.md`

Replace the template with your actual messaging framework.

**Structure to follow:**

```markdown
# Messaging Guidelines

## Our Mission

[Your actual mission statement]

## Our Value Propositions

1. **[Benefit 1]**: [What this means for customers in 1-2 sentences]
2. **[Benefit 2]**: [What this means for customers in 1-2 sentences]
3. **[Benefit 3]**: [What this means for customers in 1-2 sentences]

## Product/Service Description

### Elevator Pitch

[Your actual elevator pitch - 1-2 sentences]

### Extended Description

[2-3 sentence description for when you have more space]

## Target Audiences

### [Audience 1]

**Who they are:**
- [Role/characteristics]
- [Pain points]
- [Goals]

**How to speak to them:**
- Focus on: [what matters to them]
- Avoid: [what doesn't resonate]
- Example: "[Sample message]"

[Repeat for each audience - aim for 2-4 audiences]

## Key Messages by Scenario

### Introducing Your Company

**Message:** "[Your standard intro]"

### Explaining Your Product

**Message:** "[Your standard explanation]"

### Handling Common Objections

**Objection:** "[Common objection]"
**Response:** "[How to address it]"

[Add 3-5 common scenarios]
```

**Tips:**
- **Copy from existing docs** - don't start from scratch
- **Use actual language** you use in sales/marketing
- **Include specific examples** of good messages
- **Delete the template instructions** at the top

### Step 4: (Optional) Add More Content Files

Create additional `.md` files in `/content` for:
- `style-guide.md` - Grammar, formatting, punctuation preferences
- `product-details.md` - Technical product info the AI should know
- `competitor-positioning.md` - How to talk about competitors
- `compliance-guidelines.md` - Legal/regulatory language requirements

**The AI reads ALL `.md` files**, so only add what's relevant.

---

## Phase 4: Local Testing (15-20 minutes)

### Step 1: Set Up Environment

```bash
# Copy the example env file
cp .env.example .env.local

# Open .env.local in your editor
# Add your Anthropic API key
```

In `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

### Step 2: Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 3: Test Scenarios

Try these test queries to validate it works:

1. **Voice Check**
   - Query: "What's our brand voice?"
   - Expected: AI should reference your specific voice principles

2. **Content Generation**
   - Query: "Write a customer support email apologizing for a bug"
   - Expected: AI should use your tone, words, and style

3. **Messaging Check**
   - Query: "How should I describe our product to a [your audience]?"
   - Expected: AI should reference your value props and audience guidance

4. **Edge Cases**
   - Query: "Should I say 'utilize' or 'use'?"
   - Expected: AI should know your word preferences

5. **Context Awareness**
   - Query: "Write a LinkedIn post about our new feature"
   - Expected: AI should adapt tone for social context

### Step 4: Validation Checklist

- [ ] Company name appears correctly in header
- [ ] Brand color shows throughout UI
- [ ] Suggestions cards show your custom use cases
- [ ] AI references your specific brand guidelines
- [ ] AI uses your preferred words/phrases
- [ ] AI avoids words you listed to avoid
- [ ] Tone shifts appropriately by context
- [ ] No errors in browser console

### Common Issues & Fixes

**Issue: "ANTHROPIC_API_KEY is not configured"**
- Fix: Check `.env.local` file exists and has correct key
- Fix: Restart dev server (`Ctrl+C` then `npm run dev` again)

**Issue: AI doesn't reference my guidelines**
- Fix: Check `.md` files are in `/content` folder
- Fix: Ensure files end with `.md` extension
- Fix: Check for syntax errors in markdown files

**Issue: Wrong company name/color**
- Fix: Check `config.json` for typos
- Fix: Ensure color is valid hex (starts with `#`)
- Fix: Restart dev server to pick up config changes

**Issue: Styling looks broken**
- Fix: Run `npm install` again
- Fix: Delete `.next` folder and restart: `rm -rf .next && npm run dev`

---

## Phase 5: Deployment (15 minutes)

### Step 1: Commit Your Changes

```bash
git add .
git commit -m "Customize for [Your Company]"
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Add New" → "Project"**
3. **Import your GitHub repository**
   - Select your forked repo
   - Click "Import"
4. **Configure the project**
   - Project name: `your-company-messaging-helper`
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (leave as is)
5. **Add environment variable**
   - Click "Environment Variables"
   - Name: `ANTHROPIC_API_KEY`
   - Value: [paste your Anthropic API key]
   - Click "Add"
6. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a live URL like `your-project.vercel.app`

### Step 3: Test Live Deployment

1. **Visit your Vercel URL**
2. **Run the same test queries** you did locally
3. **Verify everything works** the same as local

### Step 4: (Optional) Add Custom Domain

1. **In Vercel project settings**
   - Go to "Domains"
   - Add your domain: `messaging.yourcompany.com`
   - Follow DNS setup instructions
2. **Update DNS** with your domain provider
3. **Wait for DNS to propagate** (5-30 minutes)

---

## Phase 6: Marketing Collaboration (30-60 minutes)

### Step 1: Introduce It to Your Marketing Team

**Email template:**

```
Subject: New AI tool for brand-consistent writing

Team,

I've set up a new AI assistant to help us write content that matches our brand voice and messaging. It's trained on our brand guidelines and can help with:

- Customer emails
- Product announcements
- Social media posts
- Marketing copy
- Blog posts
- Support responses

Try it out: [your-url]

Give it a test query like "Write a customer email about [topic]" or "What's our brand voice?"

I'd love your feedback - does the content it generates match our brand? What's working? What needs improvement?

Thanks!
```

### Step 2: Gather Feedback

**Questions to ask your team:**

1. **Accuracy**
   - Does the AI-generated content sound like our brand?
   - Are there any voice/tone issues?
   - Does it use the right terminology?

2. **Usefulness**
   - What types of content is this most helpful for?
   - What types of content does it struggle with?
   - Are there use cases we should add to the suggestions?

3. **Improvements**
   - What brand guidelines are missing or unclear?
   - Are there specific words/phrases it should use or avoid?
   - Should we add more context about specific audiences?

**How to collect feedback:**
- Schedule a 30-minute feedback session
- Create a shared doc for ongoing feedback
- Ask them to flag specific responses that feel "off-brand"

### Step 3: Iterate Based on Feedback

**Common feedback and how to address it:**

**"It's too formal/casual"**
- Update tone guidelines in `brand-voice.md`
- Add specific examples of desired tone
- Clarify tone shifts by context

**"It doesn't know about [specific thing]"**
- Add a new `.md` file with that information
- Or add a section to existing content files

**"It uses words we don't use"**
- Add to "Words We Avoid" section
- Provide alternative words to use

**"It's not clear on [audience] messaging"**
- Expand the target audience section
- Add more examples of good messages for that audience

**To update after feedback:**
```bash
# Edit the relevant files
# Then commit and push

git add .
git commit -m "Update brand guidelines based on team feedback"
git push origin main

# Vercel will auto-deploy your changes in 2-3 minutes
```

---

## Phase 7: Long-Term Maintenance

### Monthly Check-ins

- [ ] Review AI responses with marketing team
- [ ] Update guidelines as brand evolves
- [ ] Add new use cases to suggestions
- [ ] Check Anthropic usage/costs in console

### When to Update Content

Update your brand guidelines when:
- Brand voice/tone shifts
- New product launches (update messaging)
- Target audience changes
- New competitive positioning
- Marketing strategy pivots

### Monitoring Costs

- **Check usage**: [console.anthropic.com](https://console.anthropic.com) → Usage
- **Typical costs**: $2-10/month for small teams (5-10 people)
- **Set up alerts**: In Anthropic console, set usage alerts

---

## Troubleshooting

### Deployment Issues

**Vercel build fails**
- Check that all files are committed: `git status`
- Verify `package.json` is correct
- Check Vercel build logs for specific errors

**Environment variable not working**
- Ensure variable name is exactly `ANTHROPIC_API_KEY`
- Redeploy after adding/changing variables
- Check Vercel project settings → Environment Variables

**Content not loading**
- Verify `.md` files are in `/content` folder
- Check file names don't have spaces or special characters
- Ensure files are committed to git

### Content Quality Issues

**AI responses are too generic**
- Add more specific examples to guidelines
- Include actual content samples
- Be more specific about what makes your brand unique

**AI misses important context**
- Add dedicated `.md` file for that context
- Reference it explicitly in existing guidelines
- Provide examples of when to use that context

**AI tone is inconsistent**
- Clarify tone principles with more examples
- Add ✅/❌ examples for each principle
- Specify tone shifts by context more clearly

---

## Success Metrics

After 2-4 weeks of use, evaluate:

### Quantitative
- [ ] Number of team members using it
- [ ] Frequency of use (daily, weekly, etc.)
- [ ] Types of content being generated
- [ ] Cost per month (should be reasonable)

### Qualitative
- [ ] Does generated content need less editing?
- [ ] Is it helping maintain brand consistency?
- [ ] Are people finding it useful?
- [ ] Is it faster than writing from scratch?

### Feedback Questions
- "Does this save you time?"
- "Would you be disappointed if we turned it off?"
- "What would make it more useful?"

---

## Next Steps After Launch

### Week 1
- [ ] Share with marketing team
- [ ] Collect initial feedback
- [ ] Fix any obvious issues

### Week 2-4
- [ ] Gather usage data
- [ ] Update guidelines based on feedback
- [ ] Add more use cases if needed

### Month 2+
- [ ] Expand to other teams (sales, support)
- [ ] Consider adding authentication if needed
- [ ] Iterate on content based on usage patterns

---

## Quick Reference

**Local development:**
```bash
npm run dev
```

**Deploy updates:**
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

**Check API usage:**
[console.anthropic.com](https://console.anthropic.com) → Usage

**Get help:**
- Template issues: GitHub Issues
- Claude API: [docs.anthropic.com](https://docs.anthropic.com)
- Vercel: [vercel.com/docs](https://vercel.com/docs)

---

## You're Ready!

You now have everything you need to deploy your brand messaging helper. The key is starting with decent brand guidelines and iterating based on real usage.

**Remember:**
- Start simple - you can always add more later
- Get feedback early and often
- Update guidelines as you learn what works
- The AI gets better as your guidelines get clearer

Good luck! 🚀
