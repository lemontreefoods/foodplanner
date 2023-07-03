import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata = {
  title: "Food Planner",
  description: "Plan your food access!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#fff6e0", minHeight: "100vh" }}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
