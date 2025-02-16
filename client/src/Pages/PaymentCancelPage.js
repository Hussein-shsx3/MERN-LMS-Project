import React, { useEffect } from "react";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const PaymentCancelPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const token = cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-4 rounded-full">
            <XCircle className="w-16 h-16 text-red-600" />
          </div>

          <h1 className="mt-8 text-3xl font-bold text-gray-900">
            Payment Cancelled
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your payment has been cancelled. No charges have been made.
          </p>

          <div className="mt-8 w-full bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-gray-600 mb-2">Session ID</span>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-mono text-sm text-gray-800 break-all pr-2">
                    {sessionId || "No session ID available"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-red-600">Cancelled</span>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full space-y-4">
            <button
              onClick={() => navigate("/cart")}
              className="w-full py-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-4 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
