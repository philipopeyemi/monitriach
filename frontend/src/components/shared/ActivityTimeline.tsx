import React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export interface TimelineStep {
  id: string;
  time: string;
  title: string;
  description: string;
  status: "completed" | "processing" | "pending" | "failed";
}

interface ActivityTimelineProps {
  steps: TimelineStep[];
}

export function ActivityTimeline({ steps }: ActivityTimelineProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {steps.map((step, idx) => (
          <li key={step.id}>
            <div className="relative pb-8">
              {idx !== steps.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  {step.status === "completed" && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-white">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                  )}
                  {step.status === "processing" && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 ring-8 ring-white animate-pulse">
                      <Clock className="h-5 w-5" />
                    </span>
                  )}
                  {step.status === "failed" && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 ring-8 ring-white">
                      <AlertCircle className="h-5 w-5" />
                    </span>
                  )}
                  {step.status === "pending" && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 ring-8 ring-white">
                      <Clock className="h-5 w-5" />
                    </span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{step.title}</p>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-xs text-slate-400">
                    <time>{step.time}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
