import ProfileForm from "@/features/profile/components/profile-form";

const ProfilePage = () => {
  return (
    <div className="rounded-sm border-[0.5px] border-slate-100 shadow-md px-5 md:px-16 py-10 flex flex-col items-start gap-6">
      <h1 className="text-xl text-red">Edit Your Profile</h1>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
