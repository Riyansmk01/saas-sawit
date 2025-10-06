'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface CaptchaProps {
  onVerify: (isVerified: boolean) => void;
}

export default function Captcha({ onVerify }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setIsVerified(false);
    setHasAttempted(false);
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    setHasAttempted(true);
    
    // Simulate verification delay
    setTimeout(() => {
      const verified = userInput.toLowerCase() === captchaText.toLowerCase();
      setIsVerified(verified);
      onVerify(verified);
      setIsLoading(false);
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    
    // Reset verification status when user types
    if (isVerified) {
      setIsVerified(false);
      onVerify(false);
    }
    
    // Auto-verify when input length matches captcha length
    if (value.length === captchaText.length && !isVerified && !isLoading) {
      setTimeout(() => {
        const verified = value.toLowerCase() === captchaText.toLowerCase();
        setIsVerified(verified);
        onVerify(verified);
        setHasAttempted(true);
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Verifikasi Captcha *
      </label>
      
      <div className="flex items-center gap-3">
        {/* Captcha Display */}
        <div className="flex-1">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <div className="text-2xl font-mono font-bold text-gray-800 tracking-wider">
              {captchaText}
            </div>
          </div>
        </div>
        
        {/* Refresh Button */}
        <button
          type="button"
          onClick={generateCaptcha}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          title="Refresh Captcha"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Masukkan kode captcha di atas"
            className={`input-field w-full pr-10 ${
              isVerified 
                ? 'border-green-500 bg-green-50' 
                : hasAttempted && !isVerified 
                ? 'border-red-500 bg-red-50' 
                : ''
            }`}
            maxLength={6}
            disabled={isVerified}
          />
          
          {/* Status Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : isVerified ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : hasAttempted && !isVerified ? (
              <XCircle className="w-5 h-5 text-red-500" />
            ) : null}
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleVerify}
          disabled={!userInput || isLoading || isVerified}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isVerified
              ? 'bg-green-100 text-green-800 border border-green-200 cursor-not-allowed'
              : userInput && !isLoading
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Verifying...' : isVerified ? 'Verified' : 'Verify'}
        </button>
      </div>

      {/* Status Message */}
      {hasAttempted && !isVerified && !isLoading && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <XCircle className="w-4 h-4" />
          Kode captcha tidak cocok. Silakan coba lagi.
        </div>
      )}
      
      {isVerified && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          Captcha berhasil diverifikasi!
        </div>
      )}
      
      {!hasAttempted && userInput.length > 0 && userInput.length < captchaText.length && (
        <div className="text-sm text-gray-500">
          Masukkan {captchaText.length - userInput.length} karakter lagi...
        </div>
      )}
    </div>
  );
}
