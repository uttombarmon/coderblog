"use client";
import { Mail, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

const VerificationMessage = () => {
  const params = useSearchParams();
  const email = params.get("e");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 space-y-8 border border-gray-200">
        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-500 p-4 rounded-full mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Check Your Inbox
          </h1>
        </div>

        <div className="text-center text-gray-600 space-y-5">
          <p className="text-lg">We&apos;ve sent a **verification link** to:</p>
          <div className="font-mono text-xl text-indigo-600 bg-indigo-50 p-3 rounded-lg border border-indigo-200 shadow-inner">
            {email}
          </div>
          <p className="text-md">
            Please click the link in the email to activate your account and gain
            full access to CoderBlog&apos;s author tools.
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>Account verification is required for security.</span>
          </div>
        </div>

        {/* Footer Actions (Resend Button) */}
        {/* <div className="pt-4 border-t border-gray-100">
          <p className="text-center text-sm text-gray-500 mb-4">
            Didn&apos; receive the email?
          </p>
          {resendButton}
        </div> */}
      </div>
    </div>
  );
};

export default VerificationMessage;
