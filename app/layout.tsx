import "./globals.css";
import { Footer, NavBar } from "@components";
import { ReduxProvider } from "../utils/ReduxProvider";

export const metadata = {
  title: "Car Hub",
  description: "Discover the world's best car showcase application",
  icons: {
    icon: "../public/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <ReduxProvider>
          <NavBar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
