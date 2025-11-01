# 🎯 Deploy with Glitch (No Credit Card Required!)

## ✅ Why Glitch?
- 🆓 Completely FREE
- 💳 NO credit card required
- ⚡ Super easy to use
- 🔄 Auto-restarts on changes

---

## 🚀 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub (5 min)

```bash
cd testprotofolio1
git init
git add .
git commit -m "Portfolio ready for Glitch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

### Step 2: Deploy Backend on Glitch (3 min)

1. **Go to [glitch.com](https://glitch.com)**
2. **Click "Sign In"** → Sign in with GitHub (free, no card!)
3. **Click "New Project"** (top right)
4. **Select "Import from GitHub"**
5. **Paste your repo URL**: `https://github.com/YOUR_USERNAME/YOUR_REPO`
6. **Wait for import** (takes ~30 seconds)

---

### Step 3: Configure Environment Variables (2 min)

1. In Glitch project, click **".env"** in the left sidebar
2. Add these lines:
   ```env
   TELEGRAM_BOT_TOKEN=8028946023:AAFw5-YD6oC5i4lhZfqgVxwBEizLIulzJks
   TELEGRAM_CHAT_ID=6101360046
   NODE_ENV=production
   ```
3. Glitch auto-saves!

---

### Step 4: Update package.json for Glitch (1 min)

Glitch needs to know how to start your app:

1. In Glitch, click **"package.json"**
2. Find the `"scripts"` section
3. Make sure it has:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```
4. If not there, add it

---

### Step 5: Get Your Backend URL (30 sec)

1. Click **"Share"** button (top right)
2. Copy the **"Live Site"** URL
3. It looks like: `https://your-project-name.glitch.me`
4. **Save this URL** - you'll need it for frontend!

---

### Step 6: Deploy Frontend on Vercel (3 min)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up** with GitHub (free, no card!)
3. **Click "Add New"** → **"Project"**
4. **Import** your GitHub repository
5. **Add Environment Variable**:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-project-name.glitch.me` (from Step 5)
6. **Click "Deploy"**

---

### Step 7: Test Your Live Portfolio! (2 min)

1. **Visit your Vercel URL** (shown after deployment)
2. **Scroll to "Get In Touch"** section
3. **Fill out the contact form**
4. **Submit**
5. **Check your Telegram!** 📱

You should receive:
```
📬 New Contact Form Submission

👤 Name: [Name]
📧 Email: [Email]
📱 Phone: [Phone]

💬 Message:
[Message]
```

---

## ✅ You're Live!

**Frontend URL**: `https://your-project.vercel.app`
**Backend URL**: `https://your-project.glitch.me`

Share your frontend URL with anyone!

---

## 🔧 Glitch-Specific Notes

### Auto-Sleep Feature
- Glitch projects **sleep after 5 minutes** of inactivity
- They **wake up instantly** on first request
- User might see a 2-3 second delay on first form submission
- Subsequent requests are instant!

### Keep Awake (Optional)
If you want to prevent sleeping, you can use **UptimeRobot**:
1. Go to [uptimerobot.com](https://uptimerobot.com) (free)
2. Add your Glitch URL as a monitor
3. It pings every 5 minutes to keep it awake

### Project Limits
- ✅ Unlimited projects
- ✅ 4000 requests/hour (plenty for portfolio)
- ✅ 512MB memory
- ✅ Always free!

---

## 🆘 Troubleshooting

### **Issue: Glitch shows "Error starting app"**
**Fix:**
1. Check Glitch logs (bottom panel)
2. Make sure `package.json` has `"start": "node server.js"`
3. Verify all environment variables are set

### **Issue: Form submission fails**
**Fix:**
1. Open browser DevTools → Console
2. Check if CORS error appears
3. In Glitch, update `server.js` CORS to allow your Vercel URL:
   ```javascript
   app.use(cors({
     origin: 'https://your-vercel-url.vercel.app'
   }));
   ```

### **Issue: No Telegram message**
**Fix:**
1. Check Glitch logs for errors
2. Verify environment variables in `.env`
3. Test bot: `https://api.telegram.org/bot8028946023:AAFw5-YD6oC5i4lhZfqgVxwBEizLIulzJks/getMe`

---

## 🎉 Advantages of This Setup

✅ **$0 Total Cost**
✅ **No Credit Cards Required**
✅ **Easy to Update** (just edit in Glitch or push to GitHub)
✅ **Perfect for Portfolios**
✅ **Professional URLs**

---

## 🔄 Making Updates

**Option 1: Edit Directly in Glitch**
- Click any file in Glitch
- Make changes
- Auto-saves and restarts!

**Option 2: Push to GitHub**
- Make changes locally
- `git push`
- In Glitch: Tools → Import/Export → Import from GitHub

**Frontend Updates:**
- Just `git push`
- Vercel auto-deploys!

---

## 📊 Alternative Combinations

| Frontend | Backend | Card Required? | Always-On? |
|----------|---------|----------------|------------|
| Vercel   | Glitch  | ❌ No          | ⚠️ Sleeps  |
| Vercel   | Cyclic  | ❌ No          | ✅ Yes     |
| Netlify  | Glitch  | ❌ No          | ⚠️ Sleeps  |
| Vercel   | Deta    | ❌ No          | ✅ Yes     |

**Recommendation**: Vercel + Glitch is the easiest!

---

## 🚀 Ready to Deploy?

Follow the steps above and your portfolio will be live in ~15 minutes!

**No credit card. No cost. Just your awesome portfolio online!** 🎉
