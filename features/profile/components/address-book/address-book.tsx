"use client";

import { LuLoader2 } from "react-icons/lu";

import AddressBookCard from "./address-book-card";

import { useAddress } from "../../hooks/use-address";

const AddressBook = () => {
  const { addresses, isLoading } = useAddress();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LuLoader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (addresses?.length === 0) {
    return <div>No addresses found.</div>;
  }

  return (
    <div className="flex flex-col items-start w-full gap-5">
      {addresses?.map((address) => (
        <AddressBookCard address={address} key={address.id}/>
      ))}
    </div>
  );
};

export default AddressBook;
