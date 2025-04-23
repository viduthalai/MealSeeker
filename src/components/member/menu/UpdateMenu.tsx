'use client';

import type { IMenuList } from '@/models/Schema';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AddMoreDialog } from './AddMoreMenu';

const formSchema = z.object({
  addMore: z.string().optional(),
  menuList: z.array(z.string()).optional(),
});

export const UpdateMenu = ({
  memberId,
}: {
  memberId: string;
}) => {
  // userDetails: IUserList;
  // menuList: IMenuList[];
  const [updated, setUpdated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<{
    menuList: IMenuList[];
    selectedMenuIds: string;
  }>({
    menuList: [],
    selectedMenuIds: '',
  });
  // get url parameters
  const params = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isFirstTime = params.get('firstTime') === 'true';
  // Log the parameters and path for debugging
  const router = useRouter();

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const response = await fetch(`/api/member/menu/list?memberId=${memberId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch menu list');
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu list:', error);
      }
    };

    fetchMenuList();
  }, [memberId]);

  const { menuList, selectedMenuIds } = data;

  useEffect(() => {
    if (!loading) {
      const defaultMenuList = isFirstTime
        ? menuList.map(item => item.id.toString()).join(',')
        : selectedMenuIds;

      form.reset({
        menuList: defaultMenuList
          ? defaultMenuList.split(',').map(item => item.trim())
          : [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, menuList, selectedMenuIds, isFirstTime]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading Menu
        {'  '}
        <Loader2 className="animate-spin h-6 w-6 text-gray-500 " />
      </div>
    );
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      user_id: memberId,
      menu_ids: values?.menuList || '',
    };

    const result = await fetch(`/api/member/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    await result.json();

    setUpdated(true);
    router.push(`/member/menu`);
    router.refresh();
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="mb-5 float-right">
          <AddMoreDialog memberId={memberId} selectedMenuIds={selectedMenuIds} />
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
                  className=" bg-green-500 text-white w-full font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
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
