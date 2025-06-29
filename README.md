# 💬 Talko - Real-Time Chat Application

A modern, full-stack real-time chat application built with React, Node.js, and Socket.IO. Features a beautiful UI, real-time messaging, file sharing, and online user tracking.

![Talko Chat App](./frontend/public/Screenshot%20.png)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** - Secure JWT-based authentication
- **Password Encryption** - Bcrypt for secure password hashing
- **Protected Routes** - Client-side route protection
- **Session Management** - Persistent login sessions with cookies

### 💬 Real-Time Messaging
- **Instant Messaging** - Real-time message delivery using Socket.IO
- **Online Status** - Live online/offline user indicators
- **Message History** - Persistent message storage in MongoDB
- **Typing Indicators** - See when users are typing (if implemented)

### 📱 User Experience
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI** - Beautiful interface built with Tailwind CSS and DaisyUI
- **Dark/Light Theme** - Toggle between themes
- **User Profiles** - Customizable user profiles with avatar upload
- **Sidebar Navigation** - Easy access to all conversations

### 🖼️ Media Sharing
- **Image Upload** - Share images in conversations
- **Cloudinary Integration** - Optimized image storage and delivery
- **Profile Pictures** - Custom avatar uploads

### 🎨 UI/UX Features
- **Skeleton Loading** - Smooth loading states
- **Toast Notifications** - Real-time feedback for user actions
- **Message Bubbles** - Distinct styling for sent/received messages
- **Emoji Support** - Rich text messaging
- **Auto-scroll** - Automatic scrolling to latest messages

## 🛠️ Tech Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional event-based communication
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Image upload and management
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Parse HTTP request cookies

### Frontend
- **React 18** - User interface library
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS components
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Cloudinary Account** (for image uploads)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Talko---Chat-App-main
```

### 2. Install Dependencies

Install all dependencies for both frontend and backend:

```bash
# Install root dependencies and run setup for both frontend and backend
npm run build
```

Or install manually:

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```
### 3. Run the Application

#### Development Mode

**Option 1: Start both servers separately**
```bash
# Terminal 1 - Backend (from backend directory)
cd backend
npm run dev

# Terminal 2 - Frontend (from frontend directory)  
cd frontend
npm run dev
```

**Option 2: Production build**
```bash
# Build and start production server (from root directory)
npm run build
npm start
```
## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/messages/users` - Get all users for sidebar
- `GET /api/messages/:id` - Get conversation with specific user
- `POST /api/messages/send/:id` - Send message to user

### Database Setup

The application uses MongoDB with two main collections:
- **Users**: Store user account information
- **Messages**: Store chat messages between users

## 🎨 Customization

### Themes
The app supports multiple themes through DaisyUI. You can customize themes in the settings page or modify the theme configuration in `frontend/src/store/useThemeStore.js`.

### Styling
- **Tailwind CSS**: Utility classes for styling
- **DaisyUI**: Pre-built components
- Custom styles in `frontend/src/index.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string in `.env`
   - Verify network access if using MongoDB Atlas

2. **Socket.IO Connection Issues**
   - Check if both frontend and backend are running
   - Verify CORS settings in backend
   - Check firewall settings

3. **Image Upload Not Working**
   - Verify Cloudinary credentials in `.env`
   - Check file size limits
   - Ensure proper file formats (jpg, png, etc.)

4. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check Node.js version compatibility
   - Verify all environment variables are set

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information about the problem

---

**Happy Chatting! 💬✨**
