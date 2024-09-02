"use client";
import React, { useState, useEffect } from 'react';
import { auth } from '../../../utils/firebase'; // Adjust the path if necessary
import { RecaptchaVerifier, PhoneAuthProvider, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    // Initialize reCAPTCHA
    const setupRecaptcha = () => {
      if (!auth) {
        console.error('auth instance is undefined');
        return;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log('reCAPTCHA solved, proceed with sending verification code');
        },
        'expired-callback': () => {
          console.error('reCAPTCHA expired. Please try again.');
        }
      });
    };

    setupRecaptcha();

    return () => {
      // Cleanup reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        console.log('reCAPTCHA cleaned up');
      }
    };
  }, [auth]);

  const sendVerificationCode = async () => {
    if (isSending) {
      console.warn('Please wait before sending another verification code.');
      return;
    }
  
    setIsSending(true);
  
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error('Recaptcha verifier not initialized.');
      }
      
      // Ensure phoneNumber is a valid format
      if (!phoneNumber) {
        throw new Error('Phone number is required.');
      }
      
      console.log("authO", auth);
      console.log("appVerifier", appVerifier);
  
      // Request verification code
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      console.log('Verification code sent!');
      
      // Store the verification ID for future verification
      setVerificationId(confirmationResult.verificationId);
  
      // Start cooldown timer
      setCooldown(30);
      const cooldownInterval = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(cooldownInterval);
            setIsSending(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      // Check for specific error codes
      if (error.code === 'auth/too-many-requests' || error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
        alert('Too many requests. Please try again later.');
      } else {
        console.error('Error sending verification code:', error);
      }
      setIsSending(false);
    }
  };
  
  

  const verifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      console.log('Phone authentication successful!');
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <input
        type="tel"
        placeholder="Phone Number (e.g. +15555555555)"
        className='text-black'
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendVerificationCode} disabled={isSending}>
        {isSending ? `Wait ${cooldown}s` : 'Send Verification Code'}
      </button>
      <input
        type="text"
        placeholder="Verification Code"
        className='text-black'
        value={verificationCode}
        onChange={e => setVerificationCode(e.target.value)}
      />
      <button onClick={verifyCode}>Verify Code</button>
    </div>
  );
};

export default PhoneAuth;
