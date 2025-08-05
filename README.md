# ReceiptHealth: Your Smart Grocery & Wellness Companion

ReceiptHealth is an iOS mobile app that helps users make better nutritional choices by analyzing grocery receipts and providing personalized health recommendations based on their fitness activities.

## 🚀 Features

- 📸 Receipt Scanning: Snap a photo of your grocery receipt for instant analysis
- 🥗 Nutritional Insights: Get detailed breakdown of purchased food items
- 💪 Fitness Integration: Connects with Apple Health and Strava
- 🤖 AI-Powered Recommendations: Personalized health advice based on your purchases and activity
- 📊 Health Tracking: Monitor your nutritional trends over time

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo SDK
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: React Navigation
- **State Management**: React Context + Hooks
- **Data Persistence**: AsyncStorage
- **Health Data**: Apple HealthKit, Strava API
- **AI/ML**: Hugging Face models for receipt processing + Llama-3 prompt generation using context from groceries + health data

## 📱 Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- iOS Simulator (for development)
- Xcode (for iOS development)
- Expo CLI
- Git

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd receipt-health
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on iOS Simulator**
   - Press 'i' in the terminal after starting the development server
   - Or run: `npx expo run:ios`

## 📁 Project Structure

```
src/
├── features/           # Feature-based modules
│   ├── auth/          # Authentication related code
│   ├── receipt-scanning/
│   ├── health-tracking/
│   └── recommendations/
├── shared/            # Shared components and utilities
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
├── navigation/        # Navigation configuration
├── theme/            # Theme and styling constants
└── config/           # App configuration
```

## 🔑 Environment Setup

1. Create a `.env` file in the root directory:

   ```
   STRAVA_CLIENT_ID=your_strava_client_id
   STRAVA_CLIENT_SECRET=your_strava_client_secret
   ```

2. Configure iOS permissions in Xcode:
   - Camera access
   - Photo library access
   - HealthKit capabilities

## 🧪 Development

- **Code Style**: Project uses ESLint and Prettier for code formatting
- **Git Workflow**:
  - `main`: Production-ready code
  - `develop`: Main development branch
  - Feature branches: `feature/feature-name`
  - Bug fixes: `fix/bug-name`
  - Releases: `release/v1.x.x`

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Elham Huq - Initial work - elhamhuq1

## 🙏 Acknowledgments

- [List any third-party assets, libraries, or resources used]
