import { Separator } from "@/components/ui/separator";
import AddAddressBookForm from "@/features/profile/components/address-book/add-address-book-form";
import AddressBook from "@/features/profile/components/address-book/address-book";

const AddressBookPage = () => {
  return (
    <div className="rounded-sm border-[0.5px] border-slate-100 shadow-md px-5 md:px-16 py-10 flex flex-col items-start gap-6">
      <AddAddressBookForm />
      <Separator />
      <AddressBook />
    </div>
  );
};

export default AddressBookPage;
