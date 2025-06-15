"use client";

import { useState, useEffect } from "react";
import { X, LogOut, Shield, AlertTriangle } from "lucide-react";
import { signOut } from "next-auth/react";

interface LogoutModalProps {
  open?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

export function LogoutModal({
  open = false,
  onClose,
  onLogout,
}: LogoutModalProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    if (isLoggingOut) return;
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Clear any custom cookies (you can add more specific ones if needed)
      const cookiesToClear = [
        "next-auth.session-token",
        "next-auth.csrf-token",
        "next-auth.callback-url",
        "__Secure-next-auth.session-token",
        "__Host-next-auth.csrf-token",
      ];

      cookiesToClear.forEach((cookieName) => {
        // Clear for current domain
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        // Clear for localhost specifically
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`;
        // Clear for any subdomain
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost;`;
      });

      // Use NextAuth signOut to properly clear session
      await signOut({
        redirect: false, // We'll handle redirect manually
        callbackUrl: "/login", // or wherever you want to redirect
      });

      // Additional cleanup if you have any global state management
      // For example, if using Zustand, Redux, etc.
      // resetUserStore()
      // queryClient.clear() // if using React Query

      if (onLogout) {
        onLogout();
      }

      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md transform transition-all duration-300 scale-100">
        <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 pb-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <LogOut className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Logout</h2>
                <p className="text-sm text-gray-400">End your session</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoggingOut}
              className="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Warning Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center border-2 border-yellow-500/30">
                  <AlertTriangle className="w-10 h-10 text-yellow-500" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Are you sure you want to logout?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                You will be signed out of your AREAL account and redirected to
                the login page. Any unsaved changes will be lost.
              </p>
            </div>

            {/* Security Info */}
            <div className="bg-gray-800/40 rounded-xl p-4 mb-6 border border-gray-700/30">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-[#4ECDC4] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#4ECDC4] text-sm font-medium mb-1">
                    Secure Logout
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    All session data, tokens, and cached information will be
                    securely cleared from your device.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                disabled={isLoggingOut}
                className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg"
              >
                {isLoggingOut ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Logging out...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-800/30 px-6 py-4 border-t border-gray-700/30">
            <p className="text-center text-gray-500 text-xs">
              You can always log back in with your credentials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
