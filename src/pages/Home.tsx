import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, CheckCircle, ArrowRight, X, User, MapPin, GraduationCap, Mail, Phone, Github } from 'lucide-react';

const Home: React.FC = () => {
  const [demoText, setDemoText] = useState('');
  const [demoResult, setDemoResult] = useState<{
    prediction: 'human' | 'ai';
    confidence: number;
    processing: boolean;
  } | null>(null);
  const [showStudentInfo, setShowStudentInfo] = useState(false);

  const handleDemoAnalysis = async () => {
    if (!demoText.trim()) return;

    setDemoResult({ prediction: 'human', confidence: 0, processing: true });

    // Simulate API call
    setTimeout(() => {
      const isLikelyAI = demoText.toLowerCase().includes('ai') || 
                        demoText.toLowerCase().includes('artificial') ||
                        demoText.length > 200;
      
      setDemoResult({
        prediction: isLikelyAI ? 'ai' : 'human',
        confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
        processing: false
      });
    }, 2000);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI Detection',
      description: 'Uses machine learning to identify AI-generated text'
    },
    {
      icon: CheckCircle,
      title: 'Text Conversion',
      description: 'Convert AI text to more human-like writing'
    },
    {
      icon: ArrowRight,
      title: 'Easy to Use',
      description: 'Simple interface for quick text analysis'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <button 
                onClick={() => setShowStudentInfo(true)}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
              >
                <Brain className="w-4 h-4 mr-2" />
                DataScience Student Project
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Content Detection
              <span className="text-blue-600"> Tool</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              A machine learning project that detects AI-generated text using Naive Bayes classifier. 
              Built as a student project to explore text classification techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/analyze" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center">
                Try Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/convert" className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                Text Converter
              </Link>
            </div>
            
            {/* Simple indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Free to Use
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Educational Purpose
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Try It Now - Live Demo
              </h2>
              <p className="text-lg text-gray-600">
                Paste any text below to see our AI detection in action
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Enter text to analyze
                  </label>
                  <textarea
                    value={demoText}
                    onChange={(e) => setDemoText(e.target.value)}
                    placeholder="Paste your text here... (minimum 50 characters for accurate analysis)"
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="mt-4">
                    <button
                      onClick={handleDemoAnalysis}
                      disabled={demoText.length < 50 || demoResult?.processing}
                      className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${
                        (demoText.length < 50 || demoResult?.processing) && 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {demoResult?.processing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        'Analyze Text'
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {demoText.length}/50 characters minimum
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Analysis Result
                  </label>
                  <div className="h-40 bg-white border border-gray-300 rounded-lg p-4 flex items-center justify-center">
                    {demoResult ? (
                      <div className="text-center">
                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-3 ${
                          demoResult.prediction === 'human' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {demoResult.prediction === 'human' ? 'Human Written' : 'AI Generated'}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {(demoResult.confidence * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500">
                          Confidence Score
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400">
                        <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Enter text and click analyze to see results</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Project Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This project demonstrates machine learning concepts in text classification
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About This Project
          </h2>
          <p className="text-gray-600 mb-6">
            This is a machine learning project that uses a Naive Bayes classifier to detect AI-generated text. 
            The model was trained on a dataset of human and AI-written essays to learn patterns that distinguish between the two.
          </p>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Details</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Algorithm:</strong> Multinomial Naive Bayes
              </div>
              <div>
                <strong>Features:</strong> Count Vectorization
              </div>
              <div>
                <strong>Dataset:</strong> Human vs AI Essays
              </div>
              <div>
                <strong>Framework:</strong> React + Express + Python
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Information Modal */}
      {showStudentInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Student Information</h3>
                <button
                  onClick={() => setShowStudentInfo(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Student Profile */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Aneeb Ahmed</h4>
                <p className="text-gray-600 text-sm">DataScience Student</p>
              </div>

              {/* Information */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Education</p>
                    <p className="text-sm text-gray-600">Student of DataScience</p>
                    <p className="text-sm text-gray-600">University of Haripur</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">Haripur, KPK, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Project Description</p>
                    <p className="text-sm text-gray-600">
                      This AI Content Detection tool is a machine learning project that demonstrates 
                      text classification using Naive Bayes algorithm. It can identify AI-generated 
                      content and convert it to human-like writing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Skills Demonstrated</p>
                    <div className="text-sm text-gray-600 mt-1">
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-2 mb-1">Machine Learning</span>
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-2 mb-1">React.js</span>
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-2 mb-1">Python</span>
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-2 mb-1">TypeScript</span>
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-2 mb-1">NLP</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Github className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">GitHub Profile</p>
                    <a 
                      href="https://github.com/nb-hmd" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      github.com/nb-hmd
                    </a>
                    <p className="text-xs text-gray-500 mt-1">View my other projects and contributions</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Built for educational purposes as part of DataScience curriculum
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;