import "./globals.css";

export const metadata = {
  title: "TrustHire",
  description: "Privacy First Referral Platform",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body className="bg-black text-white">

        <div className="min-h-screen">

          {/* NAVBAR */}

          <nav className="border-b border-cyan-500/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

              <div>

                <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  TrustHire
                </h1>

                <p className="text-xs text-gray-400">
                  Trusted Referral Network
                </p>

              </div>

              <div className="flex items-center gap-5">

                <button className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-2 rounded-2xl text-black font-bold">
                  Dashboard
                </button>

                <button className="bg-white/10 hover:bg-white/20 transition px-5 py-2 rounded-2xl">
                  Profile
                </button>

              </div>

            </div>

          </nav>

          {/* PAGE */}

          <main className="max-w-7xl mx-auto">
            {children}
          </main>

        </div>

      </body>

    </html>
  );
}