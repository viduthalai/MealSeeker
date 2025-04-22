import { LoginForm } from '@/components/home/LoginForm';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import '../../../styles/home.css';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col min-h-screen home-bg">
      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-5xl text-gray-600 font-bold">Meal Seeker</h2>
        <div className="text-center font-bold text-gray-600 mt-4">Get Cooking, Faster</div>
      </div>

      {/* LoginForm at the bottom */}
      <div className="flex justify-center px-4 pb-10">
        <LoginForm />
      </div>
    </div>
  );
};
