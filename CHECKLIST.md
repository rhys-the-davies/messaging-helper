# Customization Checklist

Use this checklist to ensure you've fully customized your Brand Messaging Helper.

## Before Deployment

- [ ] **Get API Key**
  - Go to [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
  - Create new API key
  - Add credits to your account

## Required Customization

- [ ] **config.json**
  - [ ] Update `companyName` with your company name
  - [ ] Update `primaryColor` with your brand color (hex code)
  - [ ] Update `tagline` with your custom tagline
  - [ ] Update `welcomeMessage` if desired
  - [ ] Customize `suggestions` array (icons, text, descriptions)

- [ ] **content/brand-voice.md**
  - [ ] Remove template instructions
  - [ ] Add your brand personality traits
  - [ ] Add voice principles with examples
  - [ ] Add words you love and words you avoid
  - [ ] Add tone guidelines by context (support, marketing, etc.)

- [ ] **content/messaging-guide.md**
  - [ ] Remove template instructions
  - [ ] Add your mission/vision
  - [ ] Add your value propositions
  - [ ] Add product/service descriptions
  - [ ] Add target audience information
  - [ ] Add key messages by scenario

## Optional Customization

- [ ] **Add more content files**
  - [ ] Add additional `.md` files to `/content` for specific guidelines
  - [ ] Examples: `style-guide.md`, `product-details.md`, `competitor-positioning.md`

- [ ] **README.md**
  - [ ] Update "Deploy with Vercel" button URL with your repo
  - [ ] Update GitHub issues link with your repo
  - [ ] Add your company name to examples

- [ ] **package.json**
  - [ ] Update `author` field
  - [ ] Update `name` if desired (keep lowercase, no spaces)

## Deployment

- [ ] **Deploy to Vercel**
  - [ ] Import repo to Vercel
  - [ ] Add `ANTHROPIC_API_KEY` environment variable
  - [ ] Deploy
  - [ ] Test live URL

## After Deployment

- [ ] **Test the app**
  - [ ] Open the deployed URL
  - [ ] Verify company name appears correctly
  - [ ] Verify brand color is correct
  - [ ] Send a test message
  - [ ] Verify AI responds with brand-aware content

- [ ] **Share with team**
  - [ ] Send URL to team members
  - [ ] Provide brief instructions on how to use
  - [ ] Gather feedback

## Maintenance

- [ ] **Keep content updated**
  - [ ] Review brand guidelines quarterly
  - [ ] Update content files as brand evolves
  - [ ] Push updates to trigger redeployment

- [ ] **Monitor usage**
  - [ ] Check Anthropic usage dashboard for API costs
  - [ ] Gather feedback from team on AI quality

## Quick Test

After customizing, test these scenarios:

1. **Visual Test**
   - [ ] Brand color shows in header, buttons, and accents
   - [ ] Company name displays correctly
   - [ ] Suggestions cards show your custom content

2. **Functionality Test**
   - [ ] Type a message and press Enter
   - [ ] AI responds with streaming text
   - [ ] Response references your brand guidelines
   - [ ] No errors in browser console

3. **Content Test**
   - [ ] Ask: "What's our brand voice?"
   - [ ] AI should reference your specific guidelines from `/content`
   - [ ] Ask: "How should I write a customer email?"
   - [ ] AI should apply your tone guidelines

## Troubleshooting

If something doesn't work:

- [ ] **Config not showing**
  - Check `config.json` is valid JSON (no trailing commas)
  - Check browser console for errors
  - Redeploy

- [ ] **API key error**
  - Verify key is set in Vercel environment variables
  - Verify key is valid in Anthropic console
  - Verify you have credits in Anthropic account

- [ ] **Brand content not loading**
  - Verify `.md` files exist in `/content` folder
  - Check Vercel logs for file reading errors
  - Ensure files are committed to git

---

✅ **All Done?**

Your Brand Messaging Helper is ready to use! Share it with your team and start creating on-brand content with AI assistance.
