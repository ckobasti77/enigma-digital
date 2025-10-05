'use client';

import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";

const detail = serviceDetails["mobile-app-development"];

const MobileAppDevelopment = () => {
  return <PageHero {...detail} />;
};

export default MobileAppDevelopment;

