'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';

// const formSchema = z.object({
//   email: z.string().email({ message: 'Please enter a valid email address.' }),
//   password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
// });

export const LoginForm = () => {
  // const [error, setError] = React.useState('false');
  // const [submitted, setSubmitted] = React.useState('false');
  const router = useRouter();

  const navigate = (a = '/') => {
    console.log('Navigate to home page', a);
    router.push(a);
    router.refresh();
  };
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: 'john.doe@example.com',
  //     password: '123456',
  //   },
  // });
  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   if (submitted === 'true') {
  //     return;
  //   }
  //   setSubmitted('true');

  //   const data = {
  //     email: values.email,
  //     password: values.password,
  //   };

  //   const result = await fetch(`/api/visitor`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const res = await result.json();
  //   if (res?.status === 'error') {
  //     setError('true');
  //     setSubmitted('false');
  //     return;
  //   }
  //   // Navigate to home page
  //   if (res?.status === 'success') {
  //     localStorage.setItem('MealUserId', res?.user_id);
  //     navigate(`/member/${res?.user_id}`);
  //   }
  // };

  return (
    <div className="flex flex-col px-6 py-[7px]">
      <main className="mt-3">
        <Button variant="default" className="w-full mx-4" onClick={() => navigate(`/sign-in`)}>
          Sign In
        </Button>
        <Link className="w-full mx-4 text-sm text-white" href="/sign-up">
          Create new account
        </Link>

        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="bg-white " type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className="bg-white" type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              error === 'true' && (
                <div className="text-red-500 text-left font-bold">
                  Invalid email or password
                </div>
              )
            }
            <Button type="submit" className="w-full mb-3" disabled={form.formState.isSubmitted}>
              Login
              {
                form.formState.isSubmitted && <Loader2 className="animate-spin" />
              }
            </Button>
            <Link className="text-white font-bold" href="/register">
              Create new account
            </Link>
          </form>
        </Form> */}
      </main>
    </div>
  );
};
