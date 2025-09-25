import React, { useState } from 'react';
import { RefreshCw, Copy, Wand2, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ConversionResult {
  original_text: string;
  converted_text: string;
}

const Convert: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);


  const convertText = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    if (inputText.length < 10) {
      alert('Please enter at least 10 characters');
      return;
    }

    setIsConverting(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: inputText
        }),
      });

      if (!response.ok) {
        throw new Error(`Conversion failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
      alert('Text converted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsConverting(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard');
    } catch (err) {
      alert('Failed to copy text');
    }
  };

  const clearAll = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Text Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert AI-generated text to make it sound more natural and human-like.
          </p>
        </div>

          <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Input Text
              </h2>
              <button
                onClick={clearAll}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                disabled={!inputText && !result}
              >
                Clear
              </button>
            </div>

              <div className="space-y-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here to convert it..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              />
                
              <div className="text-sm text-gray-500 mb-4">
                {inputText.length} characters
              </div>

               <button
                 onClick={convertText}
                 disabled={isConverting || inputText.length < 10}
                 className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center ${
                   (isConverting || inputText.length < 10) ? 'opacity-50 cursor-not-allowed' : ''
                 }`}
               >
                 {isConverting ? (
                   <>
                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                     Converting...
                   </>
                 ) : (
                   <>
                     <Wand2 className="w-4 h-4 mr-2" />
                     Convert Text
                   </>
                 )}
               </button>
              </div>
            </div>

          {/* Output Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-green-600" />
                Output Text
              </h2>
              {result && (
                <button
                  onClick={() => copyToClipboard(result.converted_text)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </button>
              )}
            </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-red-800 font-medium">Conversion Error</span>
                  </div>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              )}

            {result ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <textarea
                  value={result.converted_text}
                  readOnly
                  className="w-full h-64 p-4 bg-white border border-gray-300 rounded-lg resize-none text-sm"
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <Wand2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter text and click "Convert Text" to see the result
                </p>
              </div>
            )}
            </div>
          </div>

        {/* How it Works */}
        <div className="bg-white rounded-lg p-6 shadow-sm mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How Text Conversion Works</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <p>
              This tool uses natural language processing techniques to analyze and modify text patterns 
              that are commonly found in AI-generated content.
            </p>
            <p>
              The conversion process applies various transformations to make the text sound more natural 
              and human-like while preserving the original meaning.
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Convert;