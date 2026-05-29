"use client";

import { useEffect } from "react";

export default function OAuthCallback() {
  useEffect(() => {
    // Parse access_token from fragment
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    if (accessToken && window.opener) {
      window.opener.postMessage({ type: 'google_oauth_token', accessToken }, window.origin);
      window.close();
    } else {
      // If no token, try to post an error
      if (window.opener) {
        window.opener.postMessage({ type: 'google_oauth_error' }, window.origin);
        window.close();
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-semibold">Completing sign-in...</p>
        <p className="text-sm text-slate-600">You can close this window if it doesn&apos;t close automatically.</p>
      </div>
    </div>
  );
}
