# 🙏 Bappa.ai - AI-Powered Spiritual Guidance

A **pure frontend** AI chat application that provides spiritual wisdom and guidance using the Groq API. No backend required - everything runs in your browser!

## ✨ Features

- **🤖 Real AI Intelligence** - Powered by Groq's `llama3-8b-8192` model
- **🙏 Bappa's Personality** - Wise, loving, fatherly spiritual guide with Indian cultural wisdom
- **💬 Daily Limits** - 3 messages per day to encourage mindful interaction
- **💾 Local Storage** - Chat history persists between browser sessions
- **🎨 Beautiful UI** - Modern, responsive design with smooth animations
- **📱 Mobile Friendly** - Works perfectly on all devices

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/bappa-ai.git
cd bappa-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

**Get your Groq API key from:** [https://console.groq.com/](https://console.groq.com/)

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variable: `VITE_GROQ_API_KEY`
4. Deploy!

### Other Platforms
- **Netlify** - Works great with environment variables
- **GitHub Pages** - Static hosting (set environment variables in build)
- **Any static host** - Build locally and upload `dist` folder

## 🏗️ Architecture

```
src/
├── api/
│   ├── groqService.ts    # Groq API integration
│   └── chatService.ts    # Chat logic + local storage
├── components/
│   ├── ChatInput.tsx     # Message input component
│   ├── ChatMessage.tsx   # Individual message display
│   ├── TypingIndicator.tsx # Loading animation
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # App footer
│   ├── ParallaxBg.tsx    # Animated background
│   └── ErrorBoundary.tsx # Error handling
├── pages/
│   ├── Home.tsx          # Landing page with daily limits
│   ├── Chat.tsx          # Main chat interface
│   └── NotFound.tsx      # 404 error page
├── routes/
│   └── Router.tsx        # App routing
└── types/
    └── index.ts          # TypeScript type definitions
```

## 🔧 Configuration

### Daily Message Limit
Change the limit in `src/api/chatService.ts`:
```typescript
private readonly DAILY_LIMIT = 3  // Change this number
```

### Groq Model
Change the AI model in `src/api/groqService.ts`:
```typescript
model: 'llama3-8b-8192'  // Change to any Groq model
```

### Bappa's Personality
Customize the system prompt in `src/api/groqService.ts`:
```typescript
private readonly SYSTEM_PROMPT = `Your custom prompt here...`
```

## 🎯 How It Works

1. **User types message** → Daily limit checked
2. **Groq API called** → With conversation context and Bappa's personality
3. **AI generates response** → Using spiritual wisdom and cultural knowledge
4. **Response displayed** → Daily count incremented
5. **History saved** → To browser local storage

## 🔒 Security Notes

- **API Key Exposure**: The Groq API key is visible in the browser (using `dangerouslyAllowBrowser: true`)
- **For Production**: Consider using a backend proxy for better security
- **Rate Limiting**: Groq handles API rate limiting automatically
- **User Data**: All chat data is stored locally in the user's browser

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **AI**: Groq API (llama3-8b-8192)
- **Storage**: Browser Local Storage
- **Routing**: React Router DOM
- **Build Tool**: Vite

## 📝 License

MIT License - Feel free to use this project for your own spiritual AI applications!

## 🙏 About Bappa

Bappa is designed to be a wise, loving spiritual guide who:
- Provides spiritual wisdom and guidance
- Understands Indian culture and spirituality
- Speaks with warmth and fatherly care
- Encourages positive thinking and growth
- Respects all spiritual paths and beliefs

---

**Made with ❤️ by NextGen World**

*"Om Namah Shivaya - May wisdom and peace be with you"* 🕉️
