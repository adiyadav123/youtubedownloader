import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import local from "next/font/local";

const SFPRO = local({
  src: [
    {
      path: "../public/fonts/sf_regular.otf",
      weight: "400",
    }
  ],
  variable: '--font-sfpro'
})

const Poppins = local({
  src: [
    {
      path: "../public/fonts/Poppins-Regular.ttf",
      weight: "400",
    }
  ],
  variable: '--font-poppins'
})

const GoogleSans = local({
  src: [
    {
      path: "../public/fonts/ProductSans-Regular.ttf",
      weight: "400",
    }
  ],
  variable: '--font-gsans'
})

const BigJohn = local({
  src: [
    {
      path: "../public/fonts/BigJohnPRO-Regular.otf",
      weight: "400",
    }
  ],
  variable: '--font-bigjohn'
})

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "YT Downloader";
const APP_DEFAULT_TITLE = "YT Downloader";
const APP_TITLE_TEMPLATE = "%s - YT Downloader";
const APP_DESCRIPTION = "Download YouTube videos in any format";

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
    <html lang="en">
      <body className={`${SFPRO.variable} ${BigJohn.variable} ${GoogleSans.variable} ${Poppins.variable} ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
