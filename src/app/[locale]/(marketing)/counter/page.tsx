import { CounterForm } from '@/components/CounterForm';
import { CurrentCount } from '@/components/CurrentCount';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Counter',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Counter({ searchParams }: { searchParams: { [key: string]: string } }) {
  console.log("🚀 ~ Counter vidu ~ searchParams:", searchParams.id)

  return (
    <>
      <CounterForm />

      <div className="mt-3">
        <Suspense fallback={<p>Loading</p>}>
          <CurrentCount id={searchParams.id} />
        </Suspense>
      </div>

      <div className="mt-5 text-center text-sm">
      </div>

      <a
        href="https://launch.arcjet.com/Q6eLbRE"
      >
        <Image
          className="mx-auto mt-2"
          src="/assets/images/arcjet-light.svg"
          alt="Arcjet"
          width={128}
          height={38}
        />
      </a>
    </>
  );
};
