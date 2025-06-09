import React, { useState, useEffect, useRef } from "react";
import "./EmailVerificationPage.scss";

interface VerificationData {
  email: string;
  otp: string[];
}

const EmailVerificationPage: React.FC = () => {
  const [verificationData, setVerificationData] = useState<VerificationData>({
    email: "",
    otp: ["", "", "", "", "", ""],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);

  // Refs for OTP inputs
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Countdown timer
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, isVerified]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setVerificationData((prev) => ({ ...prev, email }));

    // Clear email error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...verificationData.otp];
    newOtp[index] = value;
    setVerificationData((prev) => ({ ...prev, otp: newOtp }));

    // Clear OTP error when user starts typing
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !verificationData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const numbers = text.replace(/\D/g, "").slice(0, 6);
        const newOtp = [...verificationData.otp];

        for (let i = 0; i < 6; i++) {
          newOtp[i] = numbers[i] || "";
        }

        setVerificationData((prev) => ({ ...prev, otp: newOtp }));

        // Focus the last filled input or the first empty one
        const lastIndex = Math.min(numbers.length - 1, 5);
        otpRefs.current[lastIndex]?.focus();
      });
    }
  };

  const handleSendOtp = async () => {
    setErrors({});

    if (!verificationData.email) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!validateEmail(verificationData.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setIsResending(true);

    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("OTP sent to:", verificationData.email);

      // Reset timer and focus first OTP input
      setTimeLeft(300);
      setCanResend(false);
      otpRefs.current[0]?.focus();
    } catch (error) {
      setErrors({ general: "Failed to send OTP. Please try again." });
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};

    if (!verificationData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(verificationData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const otpString = verificationData.otp.join("");
    if (otpString.length !== 6) {
      newErrors.otp = "Please enter the complete 6-digit OTP";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Verifying:", {
        email: verificationData.email,
        otp: otpString,
      });

      // Simulate successful verification
      setIsVerified(true);
    } catch (error) {
      setErrors({ general: "Invalid OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setIsResending(true);
    setErrors({});

    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("OTP resent to:", verificationData.email);

      // Reset timer and clear OTP inputs
      setTimeLeft(300);
      setCanResend(false);
      setVerificationData((prev) => ({
        ...prev,
        otp: ["", "", "", "", "", ""],
      }));
      otpRefs.current[0]?.focus();
    } catch (error) {
      setErrors({ general: "Failed to resend OTP. Please try again." });
    } finally {
      setIsResending(false);
    }
  };

  if (isVerified) {
    return (
      <div className="verification-page">
        <div className="verification-container">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h1>Email Verified!</h1>
            <p>
              Your email has been successfully verified. You can now continue to
              your account.
            </p>
            <button
              className="continue-btn"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="verification-page">
      <div className="verification-container">
        <div className="verification-header">
          <div className="verification-logo">
            <h1>
              <span>E</span>-Shop
            </h1>
          </div>
          <h2>Verify Your Email</h2>
          <p>
            Enter your email address and the 6-digit verification code we sent
            to complete your account setup.
          </p>
        </div>

        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}

        <form className="verification-form" onSubmit={handleVerifyOtp}>
          {/* Email Input */}
          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <div className="email-input-group">
              <input
                type="email"
                id="email"
                value={verificationData.email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                className={errors.email ? "error" : ""}
              />
              <button
                type="button"
                className={`send-otp-btn ${isResending ? "loading" : ""}`}
                onClick={handleSendOtp}
                disabled={isResending || !verificationData.email}
              >
                {isResending ? "Sending..." : "Send OTP"}
              </button>
            </div>
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          {/* OTP Input */}
          <div className="form-field">
            <label>Verification Code</label>
            <div className="otp-input-group">
              {verificationData.otp.map((digit, index) => (
                <input
                  key={index}
                  //   ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className={`otp-input ${errors.otp ? "error" : ""}`}
                  placeholder="0"
                />
              ))}
            </div>
            {errors.otp && <span className="field-error">{errors.otp}</span>}
          </div>

          {/* Timer and Resend */}
          <div className="verification-info">
            {timeLeft > 0 ? (
              <p className="timer">
                Code expires in <strong>{formatTime(timeLeft)}</strong>
              </p>
            ) : (
              <p className="expired">Code has expired</p>
            )}

            <button
              type="button"
              className={`resend-btn ${canResend ? "active" : ""}`}
              onClick={handleResendOtp}
              disabled={!canResend || isResending}
            >
              {isResending ? "Resending..." : "Resend Code"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`verify-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading || verificationData.otp.join("").length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="verification-footer">
          <p>
            Need help? <a href="/contact">Contact Support</a>
          </p>
        </div>
      </div>

      {/* Background Elements */}
      <div className="verification-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
