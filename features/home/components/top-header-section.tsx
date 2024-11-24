import React from "react";

interface TopHeaderSectionProps {
  title: string;
}

const TopHeaderSection = ({ title }: TopHeaderSectionProps) => {
  return (
    <div className="flex items-center gap-5">
      <div className="h-10 w-5 bg-red rounded-md" />
      <h1 className="text-red text-lg font-semibold">{title}</h1>
    </div>
  );
};

export default TopHeaderSection;
