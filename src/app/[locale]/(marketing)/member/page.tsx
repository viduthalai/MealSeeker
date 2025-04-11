import { GenerateMenu } from '@/components/home/GenerateMenu';
import { getGreeting, getMealTime, getRandomMenuItem } from '@/components/home/utils';
import { SunSVG } from '@/components/icons/sun';
import { MenuList } from '@/lib/constants';

type IAboutProps = {
    params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IAboutProps) {

    return {
        title: "Member Home",
        description: "Member Home",
    };
}

export default async function MemberHome(props: IAboutProps) {
    const mealTime = getMealTime()
    const item = getRandomMenuItem() || {} as typeof MenuList;

    console.log("🚀 ~ MemberHome ~ item:", item)


    return (
        <>
            <div className="p-4">
                <div>
                    <div className="mt-2 text-left text-sm flex  items-center gap-1">
                        <SunSVG />  {getGreeting()}
                    </div>
                    <div className="mt-1 text-left font-bold text-md">
                        Alena Sabyan
                    </div>

                </div>
                <div>
                    <GenerateMenu item={item} />
                </div>
            </div>
        </>
    );
};
