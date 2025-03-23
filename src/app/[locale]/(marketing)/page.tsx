
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';


import { LoginButton } from '@/components/home/LoginButton';
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
    <div >
      <div className='flex justify-center mt-15'>
        {/* <img width="200px" src="/logo.png" /> */}
        <h1 className="text-5xl text-cyan-50 font-bold">Meal Seeker</h1>
      </div>
      <div className="text-center font-bold text-gray-600">Get Cooking, Faster</div>
      <div className="flex justify-between text-3xl text-white text-center font-bold mt-110 p-6">
        Help your path to health goals with happiness
      </div>
      <div className='pl-6 pr-6 text-center'>

        <LoginButton />
        <Link className='text-white font-bold' href="/signup">
          Create new account
        </Link>
      </div>

    </div >
  );
};
