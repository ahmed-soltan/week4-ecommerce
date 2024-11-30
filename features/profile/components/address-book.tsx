"use client";

import AddressBookCard from "./address-book-card";

import { useAddress } from "../hooks/use-address";

const AddressBook = () => {
  const { addresses, isLoading } = useAddress();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (addresses?.length === 0) {
    return <div>No addresses found.</div>;
  }

  return (
    <div className="flex flex-col items-start w-full gap-5">
      {addresses?.map((address) => (
        <AddressBookCard address={address} />
      ))}
    </div>
  );
};

export default AddressBook;
