import { Header } from '@/components/ui/header';
import { MobileBottomMenubar } from '@/components/ui/menubar';

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <div>
      <Header />
      <main className="flex flex-col min-h-screen">
        {props.children}
      </main>
      <MobileBottomMenubar />
    </div>
  );
}
