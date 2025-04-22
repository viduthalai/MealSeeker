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
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Index',
  // });

  return (
    <div className="home-bg">
      <div className="flex justify-center mt-15">
        {/* <img width="200px" src="/logo.png" /> */}
        <h1 className="text-5xl text-cyan-50 font-bold">Meal Seeker</h1>
      </div>
      <div className="text-center font-bold text-gray-600">Get Cooking, Faster</div>

      <div className="flex justify-between text-3xl text-gray-900 text-center font-bold mt-50">
        <LoginForm />

      </div>
    </div>
  );
};
