'use client';

import type { MenuListItem } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AddMoreDialog } from './AddMoreMenu';

const formSchema = z.object({
  addMore: z.string().optional(),
  menuList: z.array(z.string()).optional(),
});

export const UpdateMenu = ({
  userDetails,
  menuList,
}: {
  userDetails: any;
  menuList: MenuListItem[];
}) => {
  const [updated, setUpdated] = React.useState(false);
  const router = useRouter();
  const defaultMenuList = userDetails?.menu_ids || [];
  console.log('🚀 ~ defaultMenuList:', menuList, defaultMenuList);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuList: defaultMenuList.length > 0
        ? defaultMenuList.split(',').map(item => item.trim())
        : [],
      // Initialize menuList with the user's existing menu IDs
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values);

    const data = {
      user_id: userDetails?.id || 0,
      menu_ids: values?.menuList || '',
    };

    const result = await fetch(`/api/member/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await result.json();
    console.log('🚀 ~ onSubmit ~ res:', res);
    setUpdated(true);
    router.push(`/member/menu?id=${userDetails?.id}`);
    router.refresh();
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="mb-5 float-right">
          <AddMoreDialog userDetails={userDetails} />
        </div>
      </div>

      <div className="flex mt-3 flex-col items-center justify-center h-full">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="menuList"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-2 gap-4">
                    {menuList.map(item => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="menuList"
                        render={({ field }) => {
                          return (

                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >

                              <div className="items-top flex space-x-2">
                                <Checkbox
                                  id={item.id.toString()}
                                  checked={field.value?.includes(item.id.toString())}
                                  onCheckedChange={(checked) => {
                                    console.log('🚀 ~ checked:', checked, field.value);
                                    return checked
                                      ? field.onChange([...field.value || [], item.id.toString()])
                                      : field.onChange(
                                          field.value?.filter(
                                            value => value !== item.id.toString(),
                                          ),
                                        );
                                  }}
                                />
                                <div className="grid gap-1.5 leading-none">
                                  <label
                                    htmlFor={item.id.toString()}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {item.item}
                                  </label>

                                </div>
                              </div>

                            </FormItem>

                          );
                        }}
                      />
                    ))}
                  </div>

                </FormItem>

              )}
            />

            <FormField
              control={form.control}
              name="addMore"
              render={() => (
                <Button
                  size="sm"
                  type="submit"
                  className=" bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  disabled={form.formState.isSubmitting}
                >
                  Update
                  {' '}
                  { form.formState.isSubmitting
                    && <span className="animate-spin">...</span>}
                </Button>
              )}
            />

          </form>
        </Form>
        {updated && (
          <div className="text-green-500 text-sm mt-2">
            Menu updated successfully!
          </div>
        )}
      </div>
    </>
  );
};
