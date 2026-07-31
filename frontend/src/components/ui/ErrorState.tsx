import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export function ErrorState({ 
  message = "Failed to load data from Supabase.",
  onRetry 
}: { 
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="p-10 rounded-2xl bg-rose-50/70 border border-rose-200 text-center space-y-4 max-w-md mx-auto my-8">
      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mx-auto text-rose-600">
        <AlertCircle className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-rose-900">Database Connection Notice</h3>
        <p className="text-xs text-rose-700">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors inline-flex items-center space-x-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Query</span>
        </button>
      )}
    </div>
  );
}
