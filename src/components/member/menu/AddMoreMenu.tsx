'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
// import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  menuName: z.string().min(1, { message: 'Menu name is required.' }),
  isBreakfast: z.boolean().optional(),
  isLunch: z.boolean().optional(),
  isDinner: z.boolean().optional(),
  item_type: z.enum(['Curry', 'Main Course', 'Rice', 'Bread', 'Salad', 'Dessert']).default('Main Course'),
  cuisine_id: z.string().min(1, { message: 'Cuisine is required.' }),
});

export const AddMoreMenu = ({
  memberId,
  selectedMenuIds,
}: {
  memberId: string;
  selectedMenuIds?: string;

}) => {
  // const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: '',
      isBreakfast: false,
      isLunch: false,
      isDinner: true,
      item_type: 'Main Course',
      cuisine_id: '1',
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      menuName: values.menuName,
      isBreakfast: values.isBreakfast,
      isLunch: values.isLunch,
      isDinner: values.isDinner,
      cuisine_id: values.cuisine_id,
      user_id: memberId,
      item_type: values.item_type, // Assuming a default type for custom items
      menu_ids: selectedMenuIds || '',
    };

    const result = await fetch(`/api/member/menu`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await result.json();
    window.location.reload(); // Reload the page to reflect changes
    // router.push(`/member/menu`);
    // router.refresh();
    console.log('🚀 ~ onSubmit ~ res:', res);
  };

  return (
    <div className="flex mt-3 flex-col items-center justify-center h-full">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="menuName"
            render={() => (
              <FormItem>
                <div className="grid grid-cols-2">
                  <Input
                    placeholder="Menu Name"
                    aria-autocomplete="none"
                    autoComplete="off"
                    {...form.register('menuName')}
                    className="w-full"
                  />
                </div>
              </FormItem>

            )}
          />
          <div className="grid grid-cols-3 ">
            <FormField
              control={form.control}
              name="isBreakfast"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox
                    id="isBreakfast"
                    checked={field.value ?? false}
                    onCheckedChange={checked => field.onChange(checked)}
                  />
                  <label htmlFor="isBreakfast" className="text-sm">Breakfast</label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isLunch"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox
                    id="isLunch"
                    checked={field.value ?? false}
                    onCheckedChange={checked => field.onChange(checked)}

                  />
                  <label htmlFor="isLunch" className="text-sm">Lunch</label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isDinner"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox
                    id="isDinner"
                    checked={field.value ?? false}
                    onCheckedChange={checked => field.onChange(checked)}
                  />
                  <label htmlFor="isDinner" className="text-sm">Dinner</label>
                </FormItem>
              )}
            />

          </div>
          <FormField
            control={form.control}
            name="item_type"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select menu type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Course">Main Course</SelectItem>
                    <SelectItem value="Curry">Curry</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cuisine_id"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">South Indian</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <DialogClose asChild>
            <Button
              className="bg-[#70B9BE] hover:bg-[#5da8ae] text-sm"
              variant="destructive"
              type="submit"
              disabled={form.formState.isSubmitted || !form.formState.isValid || form.formState.isSubmitting}
            >

              Submit

              {
                form.formState.isSubmitted && <Loader2 className="animate-spin" />
              }
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export function AddMoreDialog({ memberId, selectedMenuIds }: { memberId: string; selectedMenuIds?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="text-sm ">
          Add Menu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Menu</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AddMoreMenu memberId={memberId} selectedMenuIds={selectedMenuIds} />
        </div>
      </DialogContent>

    </Dialog>
  );
}
