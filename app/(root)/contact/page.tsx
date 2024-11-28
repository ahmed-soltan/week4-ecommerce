import React from "react";
import { FiPhone } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";

import { Separator } from "@/components/ui/separator";
import ContainerWrapper from "@/components/container-wrapper";
import ContactForm from "@/features/contact/components/contact-form";

const ContactPage = () => {
  return (
    <ContainerWrapper className="flex flex-col item-start gap-20">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
        <div className="border shadow-md p-10 flex flex-col items-start gap-8 rounded-sm">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red p-2 flex items-center justify-center rounded-full">
                <FiPhone className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg text-black font-medium">Call To Us</h1>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>
          <Separator className="h-[2px] bg-gray-300" />
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red p-2 flex items-center justify-center rounded-full">
                <FaRegEnvelope className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg text-black font-medium">Write To Us</h1>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
        </div>
        <div className="cols-span-1 md:col-span-2 xl:col-span-3">
          <ContactForm />
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default ContactPage;
