'use client';

import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";

const detail = serviceDetails["branding"];

const Branding = () => {
  return <PageHero {...detail} />;
};

export default Branding;

