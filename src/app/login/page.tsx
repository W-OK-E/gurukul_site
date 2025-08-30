// app/login/page.tsx
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { loginAction } from '@/app/actions/auth'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string; error?: string }
}) {
  console.log("Awaiting Current User");
  const user = await getCurrentUser()
  const searchParams2 = await searchParams;
  if (user) {
    if (user.user_type === 'student') {
      redirect('/dashboard/student')
    } else if (user.user_type === 'instructor') {
      redirect('/dashboard/instructor')
    } else {
      redirect('/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-indigo-400/60 rounded-full animate-ping delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Logo/Brand section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="mt-2 text-blue-100/80">Sign in to access Gurukul</p>
          </div>

          {/* Status messages */}
          {searchParams2.message && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-lg backdrop-blur-sm">
              <p className="text-emerald-100 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {searchParams2.message}
              </p>
            </div>
          )}

          {searchParams2.error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg backdrop-blur-sm">
              <p className="text-red-100 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {searchParams2.error}
              </p>
            </div>
          )}

          {/* Login form */}
          <form className="space-y-6" action={loginAction}>
            <div className="space-y-4">
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-blue-300/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-blue-300/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-blue-100/80 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 bg-white/10 border border-white/20 rounded focus:ring-blue-400/50 focus:ring-2 text-blue-500 mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="group relative w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center justify-center">
                Sign In
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            {/* Divider */}
            <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-blue-100/60">New to Gurukul?</span>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <a 
                href="/booking" 
                className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors font-medium"
              >
                Book a Demo
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-blue-200/40 text-xs">
            &copy; {new Date().getFullYear()} Gurukul. The only tutoring solution you need!
          </p>
        </footer>
      </div>
    </main>
  )
}