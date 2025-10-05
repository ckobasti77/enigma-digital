'use client';

import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";

const detail = serviceDetails["ui-ux-design"];

const UiUxDesign = () => {
  return <PageHero {...detail} />;
};

export default UiUxDesign;

