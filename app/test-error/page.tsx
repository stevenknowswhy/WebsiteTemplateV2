'use client';

import React from 'react';

export default function ErrorTestPage() {
  // This component will throw an error to test the error boundary
  const throwError = () => {
    throw new Error('This is a test error to verify error boundary functionality');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Error Boundary Test
        </h1>

        <p className="text-gray-600 mb-6">
          This page is used to test that the React Error Boundary is working correctly.
          Clicking the button below will intentionally cause an error.
        </p>

        <div className="space-y-3">
          <button
            onClick={throwError}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 text-white px-6 py-3 font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Trigger Test Error
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Go to Homepage
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>If the error boundary is working correctly, you should see:</p>
          <ul className="list-disc list-inside mt-2 text-left">
            <li>A user-friendly error message</li>
            <li>Error details with a unique ID</li>
            <li>Options to try again or go home</li>
          </ul>
        </div>
      </div>
    </div>
  );
}