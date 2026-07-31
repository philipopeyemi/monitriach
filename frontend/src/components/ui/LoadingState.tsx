import React from "react";
import { Loader2 } from "lucide-react";

export function LoadingState({ message = "Loading workspace data..." }: { message?: string }) {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center space-y-3 min-h-[300px]">
      <Loader2 className="w-8 h-8 text-slate-900 animate-spin" />
      <p className="text-xs font-semibold text-slate-600">{message}</p>
    </div>
  );
}
