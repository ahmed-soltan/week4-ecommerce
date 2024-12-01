import EditAddressBookForm from "./edit-address-book-form";
import DeleteAddressButton from "./delete-address-button";

import { Address } from "@prisma/client";

interface AddressBookCardProps {
  address: Address;
}

const AddressBookCard = ({ address }: AddressBookCardProps) => {
  return (
    <div className="flex items-start flex-col gap-4 w-full border-b pb-3 group relative">
      <div className="flex items-start justify-between gap-2 w-full flex-wrap">
        <h1 className="text-lg font-semibold text-black">
          {address.isDefault && "Default Address"}
        </h1>
        <div className="hidden items-center gap-2 flex-wrap group-hover:flex absolute top-0 right-0">
          <EditAddressBookForm address={address} />
          <DeleteAddressButton addressId={address.id} />
        </div>
      </div>
      <p className="text-sm text-black font-normal">
        Country:{" "}
        <span className="text-gray-500 font-normal">{address.country}</span>
      </p>
      <p className="text-sm text-black font-normal">
        State:{" "}
        <span className="text-gray-500 font-normal">{address.state}</span>
      </p>
      <p className="text-sm text-black font-normal">
        City: <span className="text-gray-500 font-normal">{address.city}</span>
      </p>
      <p className="text-sm text-black font-normal">
        Zip Code:{" "}
        <span className="text-gray-500 font-normal">{address.zipCode}</span>
      </p>
      <p className="text-sm text-black font-normal">
        Street:{" "}
        <span className="text-gray-500 font-normal">{address.street}</span>
      </p>
    </div>
  );
};

export default AddressBookCard;
