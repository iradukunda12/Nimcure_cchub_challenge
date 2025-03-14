import Navbar from "./components/navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-0">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
}