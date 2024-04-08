import { getServerSession } from "next-auth";
import { Providers } from "./providers";

export const metadata = {
  title: "perfect ear",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
