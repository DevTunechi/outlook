"use client";
import React from 'react';

export default function OutlookLogin() {
  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between bg-[#f2f2f2] sm:bg-cover sm:bg-center sm:bg-no-repeat font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,sans-serif] text-[#1b1b1b] antialiased select-none"
      style={{
        backgroundImage: "url('https://aadcdn.msauth.net/shared/1.0/content/images/backgrounds/2_bc3d340a3532f2903864b1.svg')",
      }}
    >
      <div className="flex-1 flex items-start sm:items-center justify-center">
        <div 
          className="w-full bg-white p-6 pt-12 sm:p-11 pb-6 sm:my-4 sm:w-[440px] sm:shadow-[0_4px_16px_rgba(0,0,0,0.2)] sm:border sm:border-[rgba(0,0,0,0.08)] flex flex-col justify-between"
          style={{ minHeight: 'calc(100vh - 40px)', sm: { minHeight: 'auto' } }}
        >
          <div className="w-full">
            <div className="mb-5 flex items-center" aria-hidden="true">
              <div className="grid grid-cols-2 gap-[2px] w-[34px] h-[34px] flex-shrink-0">
                <div className="bg-[#f25022]"></div>
                <div className="bg-[#7fba00]"></div>
                <div className="bg-[#00a4ef]"></div>
                <div className="bg-[#ffb900]"></div>
              </div>
              <span className="ml-3 text-[#737373] font-semibold text-[20px] tracking-tight">
                Microsoft
              </span>
            </div>

            <h1 className="text-[1.5rem] font-semibold leading-8 text-[#1b1b1b] tracking-tight">
              Sign in
            </h1>
            <p className="text-[0.9375rem] text-[#1b1b1b] mt-1 mb-5">
              to continue to Outlook
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="w-full border-b border-[#666666] focus-within:border-[#0067b8]">
                <input
                  type="email"
                  placeholder="Email, phone, or Skype"
                  className="w-full outline-none py-[6px] text-[0.9375rem] text-[#1b1b1b] placeholder:text-[#666666] bg-transparent rounded-none border-none"
                  required
                />
              </div>

              <div className="text-[0.8125rem] space-y-3 pt-1">
                <p className="text-[#1b1b1b]">
                  No account?{" "}
                  <a href="#" className="text-[#0067b8] hover:underline">
                    Create one!
                  </a>
                </p>
                <p>
                  <a href="#" className="text-[#0067b8] hover:underline">
                    Can’t access your account?
                  </a>
                </p>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="bg-[#0067b8] text-white min-w-[108px] h-[32px] px-3 text-[0.9375rem] font-normal hover:bg-[#005da6] active:bg-[#005292] transition-colors border-none outline-none shadow-none"
                >
                  Next
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12">
            <button className="flex items-center gap-3 bg-transparent hover:bg-[rgba(0,0,0,0.04)] active:bg-[rgba(0,0,0,0.08)] px-2 py-1.5 transition-colors border-none outline-none rounded-none text-left">
              <svg className="w-6 h-6 text-[#2f2f2f] flex-shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="10" width="22" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
                <circle cx="11" cy="16" r="2" fill="currentColor"/>
                <rect x="17" y="14" width="2" height="4" fill="currentColor"/>
                <rect x="21" y="14" width="2" height="4" fill="currentColor"/>
              </svg>
              <span className="text-[0.9375rem] text-[#2f2f2f]">
                Sign-in options
              </span>
            </button>
          </div>
        </div>
      </div>

      <footer className="w-full bg-transparent p-4 sm:px-7 flex flex-wrap justify-end gap-x-4 gap-y-1 text-[0.75rem] text-[#505050] sm:text-[#ffffff] bg-white sm:bg-transparent border-t border-gray-200 sm:border-none">
        <a href="#" className="hover:underline">Terms of use</a>
        <a href="#" className="hover:underline">Privacy & cookies</a>
        <span className="cursor-pointer tracking-wider font-bold">...</span>
      </footer>
    </div>
  );
}
