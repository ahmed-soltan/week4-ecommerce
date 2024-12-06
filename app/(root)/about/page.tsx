import ContainerWrapper from "@/components/container-wrapper";
import { aboutImage, person1, person2, person3 } from "@/data/images";
import Image from "next/image";
import { MdStorefront } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { SlPresent } from "react-icons/sl";
import { TbMoneybag } from "react-icons/tb";
import { CiTwitter } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

import Services from "@/components/services";
import BreadCrumbs from "@/components/bread-crumbs";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-start gap-20">
      <ContainerWrapper>
        <BreadCrumbs />
      </ContainerWrapper>
      <ContainerWrapper className="ml-auto md:pr-0 flex items-start lg:items-center justify-center lg:justify-between flex-wrap lg:flex-nowrap gap-5 max-w-[1730px]">
        <div className="flex flex-col items-start gap-8 w-full max-w-[600px]">
          <h1 className="text-3xl lg:text-5xl font-semibold">Our Story</h1>
          <p className="text-md">
            Launced in 2015, Exclusive is South Asia&abos;s premier online
            shopping makterplace with an active presense in Bangladesh.
            Supported by wide range of tailored marketing, data and service
            solutions, Exclusive has 10,500 sallers and 300 brands and serves 3
            millioons customers across the region.{" "}
          </p>
          <p className="text-md">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="relative w-full max-w-[837px] h-[600px]">
          <Image src={aboutImage} alt="about image" fill />
        </div>
      </ContainerWrapper>
      <ContainerWrapper className="flex flex-col items-start gap-20">
        <div className="flex items-center justify-center lg:justify-between gap-5 flex-wrap w-full">
          <div className="rounded-sm border border-slate-500 p-5 flex items-center justify-center flex-col gap-4 w-full max-w-[300px] group hover:bg-red">
            <div className="w-16 h-16 bg-black group-hover:bg-white border-[7px] border-gray-400 rounded-full flex items-center justify-center">
              <MdStorefront className="w-7 h-7 text-white group-hover:text-black" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold group-hover:text-white">
              10.5k
            </h1>
            <p className="text-sm group-hover:text-white">
              Sallers active our site
            </p>
          </div>
          <div className="rounded-sm border border-slate-500 p-5 flex items-center justify-center flex-col gap-4 w-full max-w-[300px] group hover:bg-red">
            <div className="w-16 h-16 bg-black group-hover:bg-white border-[7px] border-gray-400 rounded-full flex items-center justify-center">
              <AiOutlineDollar className="w-7 h-7 text-white group-hover:text-black" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold group-hover:text-white">
              33k
            </h1>
            <p className="text-sm group-hover:text-white">
              Mopnthly Produduct Sale
            </p>
          </div>
          <div className="rounded-sm border border-slate-500 p-5 flex items-center justify-center flex-col gap-4 w-full max-w-[300px] group hover:bg-red">
            <div className="w-16 h-16 bg-black group-hover:bg-white border-[7px] border-gray-400 rounded-full flex items-center justify-center">
              <SlPresent className="w-7 h-7 text-white group-hover:text-black" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold group-hover:text-white">
              45.5k
            </h1>
            <p className="text-sm group-hover:text-white">
              Customer active in our site
            </p>
          </div>
          <div className="rounded-sm border border-slate-500 p-5 flex items-center justify-center flex-col gap-4 w-full max-w-[300px] group hover:bg-red">
            <div className="w-16 h-16 bg-black group-hover:bg-white border-[7px] border-gray-400 rounded-full flex items-center justify-center">
              <TbMoneybag className="w-7 h-7 text-white group-hover:text-black" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold group-hover:text-white">
              25k
            </h1>
            <p className="text-sm group-hover:text-white">
              Anual gross sale in our site
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-between gap-5 flex-wrap w-full my-20">
          <div className="flex flex-col items-start gap-5 w-full max-w-[400px]">
            <div className="w-full h-[500px] overflow-hidden bg-slate-100">
              <Image
                src={person1}
                alt="member 1"
                width={100}
                height={100}
                className="h-[530px] w-full object-contain"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-2xl">Tom Cruise</h1>
              <p className="text-sm">Founder & Chairman</p>
              <div className="flex items-center gap-2">
                <CiTwitter className="w-5 h-5" />
                <RiLinkedinLine className="w-5 h-5" />
                <FaInstagram className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-5 w-full max-w-[400px]">
            <div className="w-full h-[500px] overflow-hidden bg-slate-100">
              <Image
                src={person2}
                alt="member 1"
                width={100}
                height={100}
                className="h-[530px] w-full object-contain"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-2xl">Emma Watson</h1>
              <p className="text-sm">Founder & Chairman</p>
              <div className="flex items-center gap-2">
                <CiTwitter className="w-5 h-5" />
                <RiLinkedinLine className="w-5 h-5" />
                <FaInstagram className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-5 w-full max-w-[400px]">
            <div className="w-full h-[500px] overflow-hidden bg-slate-100">
              <Image
                src={person3}
                alt="member 1"
                width={100}
                height={100}
                className="h-[530px] w-full object-contain"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-2xl">Will Smith</h1>
              <p className="text-sm">Founder & Chairman</p>
              <div className="flex items-center gap-2">
                <CiTwitter className="w-5 h-5" />
                <RiLinkedinLine className="w-5 h-5" />
                <FaInstagram className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        <Services />
      </ContainerWrapper>
    </div>
  );
};

export default AboutPage;
