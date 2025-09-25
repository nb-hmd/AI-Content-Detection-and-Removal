import React from 'react';
import { Brain } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-900">AI Content Detection</span>
              <div className="text-sm text-gray-600">Machine Learning Project</div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            &copy; {currentYear} AI Content Detection. Built for educational purposes.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;