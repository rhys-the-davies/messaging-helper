# Quick Start Guide

Get your Brand Messaging Helper running in 5 minutes.

## Option 1: Deploy to Vercel (Easiest)

1. **Click Deploy**
   - Use the "Deploy with Vercel" button in README
   - Or go to [vercel.com](https://vercel.com) and import this repo

2. **Add API Key**
   - Go to [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
   - Create a new API key
   - In Vercel, add environment variable: `ANTHROPIC_API_KEY`
   - Paste your key

3. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! You have a live URL

## Option 2: Run Locally

1. **Clone and Install**
```bash
git clone your-repo-url
cd brand-messaging-helper
npm install
```

2. **Add API Key**
```bash
cp .env.example .env.local
# Edit .env.local and add your key
```

3. **Run**
```bash
npm run dev
```

4. **Open**
- Go to [http://localhost:3000](http://localhost:3000)

## Customize in 3 Steps

### 1. Edit `config.json`

```json
{
  "companyName": "Your Company Name",
  "primaryColor": "#FF6B35",
  "tagline": "Your tagline here"
}
```

### 2. Edit `content/brand-voice.md`

Replace the template with your actual brand voice guidelines.

### 3. Edit `content/messaging-guide.md`

Replace the template with your actual messaging framework.

## Push Changes

```bash
git add .
git commit -m "Customize for [Your Company]"
git push
```

Vercel will auto-deploy your changes!

## That's It!

Your team can now visit your URL and get AI-powered help writing brand-consistent content.

## Next Steps

- Share the URL with your team
- Add more markdown files to `/content` for additional guidelines
- Customize the suggestions in `config.json`
- Read the full [README.md](./README.md) for advanced options

## Need Help?

- **API Key Issues**: Make sure you've added credits to your Anthropic account
- **Deployment Issues**: Check Vercel logs for errors
- **Customization Help**: See the full [README.md](./README.md)
- **Questions**: Open an issue on GitHub
