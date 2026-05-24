import "./globals.css";

export const metadata = {
  title: "TrustHire",
  description: "Student Referral Network",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}