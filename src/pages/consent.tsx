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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              AI Financial Data Consent
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            How users authorize their personal AI to access financial
            information
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <div key={step.id}>
                  <div
                    className={`flex items-start gap-4 p-6 rounded-xl cursor-pointer transition-all ${
                      isActive
                        ? "bg-indigo-100 border-2 border-indigo-500 shadow-md"
                        : "bg-gray-50 border-2 border-transparent hover:border-indigo-200"
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Step Number and Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isActive ? "bg-indigo-600" : "bg-gray-300"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isActive ? "text-white" : "text-gray-600"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`font-mono text-sm ${
                            isActive ? "text-indigo-700" : "text-gray-500"
                          }`}
                        >
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{step.description}</p>

                      {isActive && (
                        <ul className="space-y-2 mt-4">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Arrow */}
                    {index < steps.length - 1 && (
                      <div className="flex-shrink-0 text-gray-400">
                        <svg
                          className="w-6 h-6"
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
                      <div className="w-0.5 h-4 bg-gray-300"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Principles */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Granular Control
              </h3>
            </div>
            <p className="text-gray-600">
              Users specify exactly what data is shared, for how long, and for
              what purpose. Permissions can be modified or revoked anytime.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Transparency</h3>
            </div>
            <p className="text-gray-600">
              Complete audit logs show when and how the AI accessed data. Users
              receive notifications for all access events.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Standards-Based
              </h3>
            </div>
            <p className="text-gray-600">
              Uses OAuth 2.0, Open Banking APIs, and FIDO standards to ensure
              security without sharing passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentFlow;
