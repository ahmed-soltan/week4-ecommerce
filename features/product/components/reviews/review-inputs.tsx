import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import StarRating from "./star-rating";
import { Textarea } from "@/components/ui/textarea";

interface ReviewInputsProps {
  form: any;
  disabled: boolean;
}

const ReviewInputs = ({ form, disabled }: ReviewInputsProps) => {
  return (
    <>
      <FormField
        name="rating"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rating</FormLabel>
            <FormControl>
              <StarRating value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="comment"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Review Comment</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={"Write your review"}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ReviewInputs;
