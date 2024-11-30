import { toast } from "@/hooks/use-toast";
import { ProfileSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

const updateProfileApi = async ({
  data,
}: {
  data: z.infer<typeof ProfileSchema>;
}) => {
  const validatedField = ProfileSchema.safeParse(data);
  if (!validatedField.success) {
    return { error: "Invalid Fields!" };
  }

  const response = await axios.patch("/api/profile", data);
  return response.data;
};

export const useProfile = () => {
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Profile Update Failed",
        description: "An error occurred while updating your profile.",
      });
      console.log(error);
    },
  });

  return {
    updateProfile,
    isUpdatingProfile,
  };
};
