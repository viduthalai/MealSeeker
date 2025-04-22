'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cuisineTypes, dietaryRestrictions, MenuList as menuItemsList } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
// import { useNavigate } from "react-router-dom";
// import { StatusBar } from "@/components/home/StatusBar";

type FormStep = 'dietary' | 'menuList';

const formSchema = z.object({
  dietaryRestrictions: z.array(z.string()).optional(),
  cuisineList: z.array(z.string()).optional(),
  menuList: z.array(z.string()).optional(),
});

export const Register = () => {
  const [step, setStep] = useState<FormStep>('dietary');

  const router = useRouter();

  const navigate = (a = '/') => {
    router.push(a);
    router.refresh();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryRestrictions: [],
      menuList: menuItemsList.map(item => item.id.toString()),
    },
  });

  const nextStep = () => {
    if (step === 'dietary') {
      setStep('menuList');
    }
  };

  const prevStep = () => {
    if (step === 'menuList') {
      setStep('dietary');
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (step !== 'menuList') {
      nextStep();
      return;
    }

    // In a real app, this is where you would submit to your backend
    // Mock storage for demonstration

    const data = {
      menu_ids: values.menuList?.join(','),
    };

    const result = await fetch(`/api/visitor`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await result.json();
    // Navigate to home page
    if (res?.status === 'success') {
      localStorage.setItem('mealSeekerUser', JSON.stringify({
        userId: res?.user_id,
        name: res?.name,
      }));

      navigate('/member');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex flex-col px-6 py-[7px]">
        {/* <StatusBar /> */}
        <main className="mt-3">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mt-4 text-[#0A2533]">
              {/* {step === 'personal' && 'Create Account'} */}
              {step === 'dietary' && 'Preferences'}
              {step === 'menuList' && 'Favorite Menu'}
              {/* {step === 'confirmation' && 'Confirm Your Choices'} */}
            </h1>
            <div className="text-[#97A2B0]  text-sm">
              {/* {step === 'personal' && 'Fill in your details to get started'} */}
              {step === 'dietary' && 'Select your meal preferences'}
              {step === 'menuList' && 'Select your favorite Menulist'}
              {/* {step === 'confirmation' && 'Review your preferences before finishing'} */}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {step === 'dietary' && (
                <FormField
                  control={form.control}
                  name="dietaryRestrictions"
                  render={() => (
                    <>

                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Dietary Restrictions</FormLabel>
                          <FormDescription>
                            Select any dietary restrictions you have
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {dietaryRestrictions.map(item => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="dietaryRestrictions"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id.toString())}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value || [], item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  value => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Cuisine Preferences</FormLabel>
                          <FormDescription>
                            Select your favorite cuisines
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {cuisineTypes.map(item => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="cuisineList"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id.toString())}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value || [], item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  value => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              )}

              {step === 'menuList' && (
                <FormField
                  control={form.control}
                  name="menuList"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-4">
                        {menuItemsList.map(item => (
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
                                          ? field.onChange([...field.value || [], item.id])
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

                      <FormMessage />

                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-between pt-4">

                {step === 'menuList' && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                )}

                {step === 'dietary' && (
                  <Button
                    className="bg-[#70B9BE] hover:bg-[#5da8ae]"
                    type="submit"
                  >
                    Next
                  </Button>
                )}
                {step === 'menuList' && (
                  <Button
                    className="bg-[#70B9BE] hover:bg-[#5da8ae]"
                    variant="destructive"
                    type="submit"
                  >
                    Complete Registration
                  </Button>
                )}

              </div>
              {step === 'menuList' && (
                <div className="text-[#4071b0] text-sm">
                  Please complete Registration to add menu items to your list
                </div>
              )}
            </form>
          </Form>
        </main>
      </div>
    </div>
  );
};

export default Register;
