import "../styles/globals.css";

export const metadata = {
  title: "Next.js Authentication",
  description: "Example using NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="m-0 h-full">
      <body className="bg-blue-50 m-0 w-full h-full flex flex-row">
        <div className="bg-blue-100 flex flex-col flex-1 w-full m-5 rounded-lg shadow-blue-500 shadow-lg p-5">
          {children}
        </div>
      </body>
    </html>
  );
}
