'use client';

import React, { useState, useCallback } from 'react';
import { useOptimizedEventHandler, useDebouncedState, usePerformanceMonitor, useOptimizedImage } from '@/lib/react-optimizations';

interface FormData {
  name: string;
  email: string;
  message: string;
  company?: string;
}

interface OptimizedContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  className?: string;
}

// Dynamically load icons to reduce bundle size
const loadIcons = async () => {
  const { Mail, Phone, Building2, Send } = await import('lucide-react');
  return { Mail, Phone, Building2, Send };
};

export const OptimizedContactForm: React.FC<OptimizedContactFormProps> = ({
  onSubmit,
  className = '',
}) => {
  const metrics = usePerformanceMonitor('OptimizedContactForm');
  const [icons, setIcons] = useState<Record<string, any> | null>(null);

  // Use debounced state for form data
  const [formData, setFormData, debouncedFormData] = useDebouncedState<FormData>({
    name: '',
    email: '',
    message: '',
    company: '',
  }, 300);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load icons dynamically
  React.useEffect(() => {
    loadIcons().then(setIcons);
  }, []);

  // Optimized change handler
  const handleChange = useOptimizedEventHandler((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, 16); // 60fps

  // Optimized submit handler
  const handleSubmit = useOptimizedEventHandler(async (e: React.FormEvent) => {
    e.preventDefault();

    if (debouncedFormData.name && debouncedFormData.email && debouncedFormData.message) {
      setIsSubmitting(true);
      setSubmitStatus('idle');

      try {
        await onSubmit(debouncedFormData);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', company: '' });
      } catch (error) {
        setSubmitStatus('error');
        console.error('Form submission failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, 100);

  // Validate form data
  const isValid = debouncedFormData.name && debouncedFormData.email && debouncedFormData.message;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
          <div>Render count: {metrics.renderCount}</div>
          <div>Avg render time: {metrics.avgRenderTime.toFixed(2)}ms</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              formData.email && !emailRegex.test(formData.email)
                ? 'border-red-300 bg-red-50'
                : formData.email
                ? 'border-green-300 bg-green-50'
                : 'border-gray-300'
            }`}
            placeholder="john@example.com"
            required
          />
          {formData.email && !emailRegex.test(formData.email) && (
            <p className="text-sm text-red-600" role="alert">
              Please enter a valid email address
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company
          {icons?.Building2 && <icons.Building2 className="inline w-4 h-4 ml-1" />}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Company name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
          placeholder="How can we help you?"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting || !emailRegex.test(debouncedFormData.email)}
        className={`w-full py-3 px-6 rounded-md font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
          !isValid || !emailRegex.test(debouncedFormData.email)
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        }`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          <>
            {icons?.Send && <icons.Send className="w-5 h-5" />}
            Send Message
          </>
        )}
      </button>

      {/* Status messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center space-x-2 text-green-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414l-4 4a1 1 0 00-1.414-1.414L10 12.172l2.293 2.293z" clipRule="evenodd" />
            </svg>
            <span>Thank you! Your message has been sent successfully.</span>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center space-x-2 text-red-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 10-1.414-1.414L10 8.586 8.707a1 1 0 00-1.414-1.414L10 8.586 8.707z" clipRule="evenodd" />
            </svg>
            <span>Sorry, there was an error sending your message. Please try again.</span>
          </div>
        </div>
      )}

      {/* Contact information */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Other ways to reach us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            {icons?.Mail && <icons.Mail className="w-4 h-4" />}
            <span>contact@example.com</span>
          </div>
          <div className="flex items-center space-x-2">
            {icons?.Phone && <icons.Phone className="w-4 h-4" />}
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OptimizedContactForm;