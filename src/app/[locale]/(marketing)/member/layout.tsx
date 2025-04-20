import { MobileBottomMenubar } from '@/components/ui/menubar';
import { setRequestLocale } from 'next-intl/server';

export default async function RegisterLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main>
      <div className=" py-5 text-xl [&_p]:my-6">
        {props.children}
      </div>
      <MobileBottomMenubar />
    </main>
  );
}
