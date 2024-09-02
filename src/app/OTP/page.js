"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../../utils/firebase'; // Ensure correct import
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export default function OtpLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  useEffect(() => {
    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    });
    setRecaptchaVerifier(verifier);
    return () => verifier.clear();
  }, []);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    setIsPending(true);
    setError('');

    if (!confirmationResult) {
      setError('Please request OTP first.');
      setIsPending(false);
      return;
    }

    try {
      await confirmationResult.confirm(otp);
    } catch (err) {
      console.error(err);
      setError('Failed to verify OTP. Please check the OTP.');
    } finally {
      setIsPending(false);
    }
  };

  const requestOtp = async (e) => {
    e.preventDefault();

    if (isPending || resendCountdown > 0) {
        return; // Prevent sending OTP if already in process or if countdown is active
    }

    setResendCountdown(60);
    setIsPending(true);
    setError('');

    if (!recaptchaVerifier) {
        setError('RecaptchaVerifier is not initialized.');
        setIsPending(false);
        return;
    }

    // Validate phone number format if needed
    if (!/^\+\d{1,3}\d{1,14}$/.test(phoneNumber)) {
        setError('Invalid phone number format. Please use the international format.');
        setIsPending(false);
        return;
    }

    try {
        const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        setConfirmationResult(result);
        setSuccess('OTP sent successfully.');
    } catch (err) {
        console.error(err);
        setResendCountdown(0);
        setError(handleFirebaseError(err));
    } finally {
        setIsPending(false);
    }
};


  const handleFirebaseError = (err) => {
    switch (err.code) {
      case 'auth/invalid-phone-number':
        return 'Invalid phone number. Please check the number.';
      case 'auth/too-many-requests':
        return 'Too many requests. Please try again later.';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed. Please enable phone authentication in Firebase console.';
      default:
        return 'Failed to send OTP. Please try again.';
    }
  };

  const loadingIndicator = (
    <div role="status" className="flex justify-center">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center">
      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="text-black"
          />
          <p className="text-xs text-gray-400 mt-2">
            Please enter your number with the country code (i.e. +44 for UK)
          </p>
          <button
            type="submit"
            disabled={!phoneNumber || isPending || resendCountdown > 0}
            className="mt-5"
          >
            {resendCountdown > 0
              ? `Resend OTP in ${resendCountdown}`
              : isPending
              ? 'Sending OTP'
              : 'Send OTP'}
          </button>
        </form>
      )}

      {confirmationResult && (
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            placeholder="Enter OTP"
          />
        </div>
      )}

      <div className="p-10 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>

      <div id="recaptcha-container" />

      {isPending && loadingIndicator}
    </div>
  );
}
