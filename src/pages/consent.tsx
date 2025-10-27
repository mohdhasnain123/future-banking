import React, { useState } from "react";
import {
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  Database,
  Brain,
  User,
  Building2,
  Key,
  Clock,
  FileText,
} from "lucide-react";
import mountainBg from "@/assets/mountain-bg.jpg";

const ConsentFlow = ({
  listening,
  browserSupportsSpeechRecognition,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "User Request",
      icon: User,
      description: "User asks their personal AI to access financial data",
      details: [
        "User initiates request through natural language",
        "AI identifies need for financial data access",
      ],
    },
    {
      id: 1,
      title: "Consent Request",
      icon: AlertCircle,
      description: "AI presents clear consent request",
      details: [
        "Specific data types needed",
        "Purpose of access explained",
        "Duration of access specified",
      ],
    },
    {
      id: 2,
      title: "Authentication",
      icon: Key,
      description: "User authenticates identity",
      details: [
        "Biometric verification (Face ID, fingerprint)",
        "Multi-factor authentication",
        "Passwordless options (passkeys)",
      ],
    },
    {
      id: 3,
      title: "Authorization",
      icon: Shield,
      description: "User grants granular permissions",
      details: [
        "Select specific accounts/data",
        "Set access duration",
        "Define usage limits",
      ],
    },
    {
      id: 4,
      title: "OAuth 2.0 / Open Banking",
      icon: Lock,
      description: "Secure connection established",
      details: [
        "Token-based access (no password sharing)",
        "Bank-level encryption",
        "Revocable at any time",
      ],
    },
    {
      id: 5,
      title: "Data Access",
      icon: Database,
      description: "AI accesses permitted data",
      details: [
        "Read-only by default",
        "Audit trail maintained",
        "Real-time activity logging",
      ],
    },
    {
      id: 6,
      title: "Ongoing Control",
      icon: CheckCircle,
      description: "User maintains control",
      details: [
        "View access history",
        "Modify permissions",
        "Revoke access instantly",
      ],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Brain className="w-10 h-10 text-primary" />
              <h1 className="text-3xl font-bold text-white">
                AI Financial Data Consent
              </h1>
            </div>
            <p className="text-base text-white/80">
              How users authorize their personal AI to access financial
              information
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="bg-glass-bg/60 backdrop-blur-md border-glass-border rounded-2xl p-4 mb-4">
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;

                return (
                  <div key={step.id}>
                    <div
                      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        isActive
                          ? "bg-primary/20 border-2 border-primary shadow-md"
                          : "bg-white/5 border-2 border-transparent hover:border-primary/30"
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      {/* Step Number and Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive ? "bg-primary" : "bg-white/20"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isActive ? "text-background" : "text-white/60"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-mono text-xs ${
                              isActive ? "text-primary" : "text-white/60"
                            }`}
                          >
                            Step {index + 1}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-white/70 mb-2">{step.description}</p>

                        {isActive && (
                          <ul className="space-y-1 mt-2">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-white/80">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Arrow */}
                      {index < steps.length - 1 && (
                        <div className="flex-shrink-0 text-white/40">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="flex justify-center">
                        <div className="w-0.5 h-2 bg-white/20"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Principles */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-glass-bg/60 backdrop-blur-md border-glass-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Granular Control
                </h3>
              </div>
              <p className="text-sm text-white/70">
                Users specify exactly what data is shared, for how long, and for
                what purpose. Permissions can be modified or revoked anytime.
              </p>
            </div>

            <div className="bg-glass-bg/60 backdrop-blur-md border-glass-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-white">Transparency</h3>
              </div>
              <p className="text-sm text-white/70">
                Complete audit logs show when and how the AI accessed data. Users
                receive notifications for all access events.
              </p>
            </div>

            <div className="bg-glass-bg/60 backdrop-blur-md border-glass-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-secondary/40 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Standards-Based
                </h3>
              </div>
              <p className="text-sm text-white/70">
                Uses OAuth 2.0, Open Banking APIs, and FIDO standards to ensure
                security without sharing passwords.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentFlow;
