export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex items-center justify-center
     bg-gradient-to-b from-sky-400 to-blue-800">
      {children}
    </div>
  );
}
