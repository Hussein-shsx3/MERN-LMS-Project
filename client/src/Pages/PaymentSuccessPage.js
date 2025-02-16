import React, { useEffect } from "react";
import { CheckCircle, ArrowLeft, Copy } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice"; // Importing the clearCart action

const cookies = new Cookies();

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const sessionId = searchParams.get("session_id");
  const token = cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      // Dispatch clearCart to empty the cart after payment success
      dispatch(clearCart());
    }
  }, [token, navigate, dispatch]);

  if (!token) return null;

  const copySessionId = () => {
    if (sessionId) {
      navigator.clipboard.writeText(sessionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-100 p-4 rounded-full animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>

          <h1 className="mt-8 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your payment. Your order has been confirmed.
          </p>

          <div className="mt-8 w-full bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-gray-600 mb-2">Session ID</span>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-mono text-sm text-gray-800 break-all pr-2">
                    {sessionId || "No session ID available"}
                  </span>
                  {sessionId && (
                    <button
                      onClick={copySessionId}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-green-600">Confirmed</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full space-y-4">
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

export default PaymentSuccessPage;
