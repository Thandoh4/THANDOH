# MEC Police Security Portal - Network Setup Guide

## 📡 Making the Website Accessible Over Internet/Network

### Option 1: Using Node.js (Recommended)

#### Prerequisites:
- Install Node.js from https://nodejs.org/ (Windows version)

#### Steps:

1. **Install Dependencies:**
   - Open Command Prompt
   - Navigate to your project folder:
     ```
     cd c:\Users\lenovo\WORK OUT
     ```
   - Install Express:
     ```
     npm install express
     ```

2. **Start the Server:**
   ```
   npm start
   ```
   or
   ```
   node server.js
   ```

3. **Access the Website:**
   - **From same computer:** http://localhost:3000
   - **From other computers on network:** http://<YOUR_IP>:3000

4. **Find Your IP Address:**
   - Open Command Prompt and type:
     ```
     ipconfig
     ```
   - Look for "IPv4 Address" (usually starts with 192.168.x.x or 10.x.x.x)
   - Example: http://192.168.1.100:3000

---

### Option 2: Using Python (No Installation Needed)

If you have Python installed:

#### For Python 3:
```
cd c:\Users\lenovo\WORK OUT
python -m http.server 3000
```

#### For Python 2:
```
cd c:\Users\lenovo\WORK OUT
python -m SimpleHTTPServer 3000
```

Then access: http://localhost:3000

---

## 🌐 Internet Access (Beyond Local Network)

To make the website accessible from the internet:

### Option 1: Using Ngrok (Free Tunneling Service)
1. Download from: https://ngrok.com/download
2. Extract and run:
   ```
   ngrok http 3000
   ```
3. Use the provided URL to access from anywhere

### Option 2: Port Forwarding
- Configure your router's port forwarding settings
- Forward port 3000 to your computer's IP
- Access via: http://your-public-ip:3000

### Option 3: Cloud Hosting
- Deploy to Heroku, AWS, DigitalOcean, etc.
- Free tier options available

---

## 🔒 Security Notes

⚠️ **Important:**
- This website stores data in browser localStorage (client-side)
- For production use, implement a proper backend database
- Use HTTPS for internet access (not just HTTP)
- Restrict access with authentication tokens if hosting online
- Change the contact email/phone if needed

---

## 📋 Firewall Settings

If the website isn't accessible from other computers:

1. **Allow through Windows Firewall:**
   - Open Windows Defender Firewall
   - Click "Allow an app through firewall"
   - Find Node.js and allow it
   - Or allow port 3000

2. **Check Network:**
   - Both computers should be on same WiFi/Network
   - Ensure firewall isn't blocking port 3000

---

## 🧪 Testing

After starting the server:
- Test locally: http://localhost:3000
- Test from another computer: http://<SERVER_IP>:3000
- Try logging in with:
  - Badge: M260205
  - Officer Name: BLESSINGS MALIRANO

---

## ✅ Troubleshooting

**Port Already in Use:**
```
Use different port: node server.js PORT=8000
Then access: http://localhost:8000
```

**Can't access from other computer:**
- Check firewall settings
- Verify IP address is correct
- Ensure both on same network

**npm install fails:**
- Update Node.js to latest version
- Clear npm cache: `npm cache clean --force`
- Try again

---

## 📞 Support

For issues: chathaabraham11@gmail.com or 0884342227
