import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const AddressFormInputs = ({ form }: { form: any }) => {
  return (
    <>
      <FormField
        name="country"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input
                className="bg-gray-100 border-0 shadow-none rounded-sm"
                {...field}
                placeholder="e.g. Egypt"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="state"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>State</FormLabel>
            <FormControl>
              <Input
                className="bg-gray-100 border-0 shadow-none rounded-sm"
                {...field}
                placeholder="e.g. Cairo"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="city"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input
                className="bg-gray-100 border-0 shadow-none rounded-sm"
                {...field}
                placeholder="e.g. new Cairo"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center gap-3 w-full ">
        <FormField
          name="street"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100 border-0 shadow-none rounded-sm"
                  {...field}
                  placeholder="e.g. street123"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="zipCode"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100 border-0 shadow-none rounded-sm"
                  {...field}
                  placeholder="e.g. 123456"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="isDefault"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Set as a Default Address</FormLabel>
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default AddressFormInputs;
