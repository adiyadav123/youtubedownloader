import { Inter } from "next/font/google";
import localFont from '@next/font/local'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });
const hatton = localFont({
  src: [
    { path: '../public/fonts/hatton.otf', weight: '700' }
  ],
  variable: '--font-hatton'
});
const bigJohn = localFont({
  src: [
    { path: '../public/fonts/BigJohnPRO-Regular.otf', weight: '700' },
  ],
  variable: '--font-big-john'
});
const poppins = localFont({
  src: [
    { path: '../public/fonts/Poppins-Regular.ttf', weight: '400' },
  ],
  variable: '--font-poppins'
});
const googleSans = localFont({
  src: [
    { path: '../public/fonts/googlesans.woff2', weight: '400' },
  ],
  variable: '--font-google-sans'
});

const APP_NAME = "OffTube";
const APP_DEFAULT_TITLE = "OffTube";
const APP_TITLE_TEMPLATE = "%s - YT Downloader";
const APP_DESCRIPTION = "Ditch the frustration! Download YouTube videos easily and safely with OffTube, the fast, user-friendly downloader. Enjoy them offline, anytime, anywhere.";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=" scroll-smooth">
      <body className={`${inter.className} ${hatton.variable} ${poppins.variable} ${googleSans.variable} ${bigJohn.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
