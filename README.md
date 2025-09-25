# 🤖 AI Content Detection and Removal

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.0%2B-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)

A powerful web application that detects AI-generated content and converts it to human-like writing using advanced machine learning algorithms and natural language processing techniques.

## 🎥 Demo

### 📹 Project Demonstration

> **Note:** Watch the complete video demonstration below to see the project in action!

**Demo Video:**

<video width="800" controls>
  <source src="demo/Video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

*The demo showcases:*
- ✅ **AI Content Detection** - Real-time analysis with confidence scores
- ✅ **Human Content Recognition** - Accurate identification of human-written text
- ✅ **AI-to-Human Conversion** - Transform AI content into natural, human-like writing
- ✅ **User Interface** - Clean, intuitive design for seamless user experience

**Alternative:** [Download Demo Video](demo/Video.mp4) if the embedded video doesn't load.

### 🖼️ Application Screenshots

| Feature | Description |
|---------|-------------|
| 🏠 **Home Page** | Welcome interface with feature overview |
| 🔍 **Analyze Page** | AI content detection with confidence metrics |
| 🔄 **Convert Page** | AI-to-human text conversion tool |

*Click on the demo video file above to download and watch the full demonstration.*

## ✨ Features

### 🔍 **AI Content Detection**
- **High Accuracy Detection**: Achieves 90%+ confidence in distinguishing between AI-generated and human-written content
- **Advanced Heuristic Analysis**: Uses multiple linguistic indicators including:
  - Sentence structure variance
  - Vocabulary complexity patterns
  - Transition word usage
  - Personal pronoun frequency
  - Emotional expression analysis
- **Real-time Analysis**: Instant content analysis with detailed confidence scores
- **Word Count Statistics**: Provides comprehensive text metrics

### 🔄 **AI-to-Human Content Conversion**
- **Intelligent Text Transformation**: Converts AI-generated content to natural, human-like writing
- **Child-friendly Simplification**: Makes complex text simple and easy to understand
- **Vocabulary Simplification**: Replaces complex words with everyday alternatives
- **Sentence Structure Optimization**: Breaks down long sentences into shorter, more natural ones
- **Casual Language Integration**: Adds contractions, informal expressions, and personal touches

### 🎯 **Key Capabilities**
- **Dual Functionality**: Both detection and conversion in one platform
- **User-friendly Interface**: Clean, modern design with intuitive navigation
- **Fast Processing**: Quick analysis and conversion results
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nb-hmd/AI-Content-Detection-and-Removal.git
   cd AI-Content-Detection-and-Removal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

## 💻 Usage

### AI Content Detection

1. **Navigate to the Analyze page**
2. **Paste or type your content** in the text area
3. **Click "Analyze Content"**
4. **View results** including:
   - Prediction (AI-generated or Human-written)
   - Confidence percentage
   - Word count statistics

### Content Conversion

1. **Go to the Convert page**
2. **Input AI-generated content** you want to humanize
3. **Click "Convert to Human-like"**
4. **Review the converted text** with simplified language and natural flow

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server-side code
- **Custom ML Service** - Heuristic analysis algorithms

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart
- **Concurrently** - Run multiple commands

## 📁 Project Structure

```
AI-Content-Detection-and-Removal/
├── 📁 api/                    # Backend API server
│   ├── 📁 middleware/         # Express middleware
│   ├── 📁 routes/            # API route handlers
│   ├── 📁 services/          # Business logic services
│   └── 📄 server.ts          # Main server file
├── 📁 src/                   # Frontend React application
│   ├── 📁 components/        # Reusable UI components
│   ├── 📁 pages/            # Application pages
│   └── 📄 App.tsx           # Main App component
├── 📁 demo/                  # Demo video and assets
├── 📁 ml_service/           # Machine learning components
├── 📄 package.json         # Project dependencies
├── 📄 vite.config.ts       # Vite configuration
└── 📄 README.md            # Project documentation
```

## 🔧 API Endpoints

### Analysis Endpoint
```http
POST /api/analyze
Content-Type: application/json

{
  "text": "Your content to analyze"
}
```

**Response:**
```json
{
  "prediction": "human" | "ai",
  "confidence": 0.95,
  "word_count": 150
}
```

### Conversion Endpoint
```http
POST /api/convert
Content-Type: application/json

{
  "text": "AI-generated content to convert"
}
```

**Response:**
```json
{
  "original_text": "Original content",
  "converted_text": "Human-like converted content"
}
```

## 🎯 Key Features Explained

### Detection Algorithm
Our detection system uses a sophisticated heuristic analysis that examines:
- **Linguistic Patterns**: Formal vs. casual language usage
- **Sentence Complexity**: Length variance and structure analysis
- **Vocabulary Choices**: Technical vs. everyday word preferences
- **Personal Elements**: Use of contractions, pronouns, and emotional expressions

### Conversion Process
The conversion algorithm transforms AI content by:
- **Simplifying Vocabulary**: Complex words → Simple alternatives
- **Adding Personal Touch**: Inserting personal pronouns and casual expressions
- **Breaking Sentences**: Long sentences → Multiple shorter ones
- **Emotional Enhancement**: Adding human-like emotional expressions

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries
- Inspired by the need for better AI content detection and humanization
- Built with modern web technologies for optimal performance

## 📞 Contact

If you have any questions or suggestions, feel free to reach out!

---

**Made with ❤️ for better AI content detection and conversion**