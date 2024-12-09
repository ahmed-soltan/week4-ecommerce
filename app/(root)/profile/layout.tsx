import ContainerWrapper from "@/components/container-wrapper";
import ProfileHeader from "@/features/profile/components/profile-header";
import ProfileSidebar from "@/features/profile/components/profile-sidebar";
import ResponsiveProfileSidebar from "@/features/profile/components/responsive-profile-sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContainerWrapper className="flex flex-col items-start gap-20">
      <ProfileHeader />
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-5">
        <div className="hidden lg:block">
          <ProfileSidebar />
        </div>
        <div className="block lg:hidden">
          <ResponsiveProfileSidebar />
        </div>
        <div className="col-span-1 lg:col-span-3">{children}</div>
      </div>
    </ContainerWrapper>
  );
}
