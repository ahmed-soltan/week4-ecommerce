import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";

import { option4, options1, options2, options3 } from "@/data/images";

const PaymentOptions = ({ form }: { form: any }) => {
  const paymentMethod = form.watch("paymentMethod");

  return (
    <div className="w-full">
      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem className="space-y-3 w-full">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-4 w-full"
              >
                <FormItem className="flex items-start space-x-3 space-y-0 w-full">
                  <FormControl>
                    <RadioGroupItem value="card" className="mt-[2px]" />
                  </FormControl>
                  <div className="flex flex-col items-start gap-4 w-full">
                    <FormLabel className="flex items-center w-full justify-between gap-2">
                      <p>Card</p>
                      <div className="flex items-center gap-1">
                        <Image
                          src={options1}
                          alt="Card"
                          width={30}
                          height={30}
                        />
                        <Image
                          src={options2}
                          alt="Card"
                          width={30}
                          height={30}
                        />
                        <Image
                          src={options3}
                          alt="Card"
                          width={30}
                          height={30}
                        />
                        <Image
                          src={option4}
                          alt="Card"
                          width={30}
                          height={30}
                        />
                      </div>
                    </FormLabel>
                    {paymentMethod === "card" && (
                      <div className="flex flex-col items-start gap-2 w-full">
                        <FormField
                          name={"cardNumber"}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Card Number"
                                  className="w-full h-12"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="w-full flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal h-12",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Expiration Date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name={"cvv"}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="CVV"
                                    className="w-full h-12"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="cash" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Cash On Delivery
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PaymentOptions;
