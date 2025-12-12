import "./globals.css";
import LogoutButton from "@/components/ui/LogoutButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-blue-500 text-white flex justify-end">
          <LogoutButton />
        </header>

        {children}
      </body>
    </html>
  );
}
