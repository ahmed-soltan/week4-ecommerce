import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSend } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import { RiLinkedinLine } from "react-icons/ri";

import { Button } from "./ui/button";

import { AppleStoreImage, GooglePlayImage, QrCodeImage } from "@/data/images";

const Footer = () => {
  return (
    <div className="border-b bg-black">
      <div className="p-5  flex items-center justify-between w-full max-w-[1550px] mx-auto min-h-[400px] flex-wrap gap-5">
        <div className="flex flex-col items-start gap-5 text-white">
          <h1 className="text-2xl font-bold">
            <Link href={"/"}>Exclusive</Link>
          </h1>
          <h2 className="text-xl font-semibold">Subscribe</h2>
          <p className="text-sm">Get 10% off your first Order</p>
          <Button className="bg-transparent" variant={"outline"}>
            <span className="text-[#FAFAFA]/50">Enter Your Email</span>
            <AiOutlineSend className="w-4 h-4 ml-4" />
          </Button>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-xl text-white">Support</h1>
          <ul className="flex flex-col items-start gap-3 w-full max-w-[200px] text-white/90">
            <li className="text-sm">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </li>
            <li className="text-sm">exclusive@gmail.com</li>
            <li className="text-sm">+88015-88888-9999</li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-xl text-white">Account</h1>
          <ul className="flex flex-col items-start gap-3 w-full max-w-[200px] text-white/90">
            <li className="text-sm">My Account.</li>
            <li className="text-sm">Login / Register</li>
            <li className="text-sm">Cart</li>
            <li className="text-sm">Wishlist</li>
            <li className="text-sm">Shop</li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-xl text-white">Quick Links</h1>
          <ul className="flex flex-col items-start gap-3 w-full max-w-[200px] text-white/90">
            <li className="text-sm">Privacy Policy</li>
            <li className="text-sm">Terms of Use</li>
            <li className="text-sm">FAQ</li>
            <li className="text-sm">Contact</li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-xl text-white">Download App</h1>
          <span className="text-xs text-gray-400">
            Save $3 with App New User Only
          </span>
          <div className="flex items-start gap-5">
            <Image src={QrCodeImage} alt="QR Code" width={100} height={100} />
            <div className="flex flex-col items-start mb-4">
              <Image
                src={GooglePlayImage}
                alt="Google Play Image"
                width={100}
                height={5}
                className="max-h-[50px] object-cover"
              />
              <Image
                src={AppleStoreImage}
                alt="Google Play Image"
                width={100}
                height={5}
                className="max-h-[40px] object-cover"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <FaFacebookF className="w-5 h-5 text-white" />
            <RxTwitterLogo className="w-5 h-5 text-white" />
            <FaInstagram className="w-5 h-5 text-white" />
            <RiLinkedinLine className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
