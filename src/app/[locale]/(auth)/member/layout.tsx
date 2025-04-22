import { MobileBottomMenubar } from '@/components/ui/menubar';

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <div>
      {props.children}
      <MobileBottomMenubar />
    </div>
  );
}
