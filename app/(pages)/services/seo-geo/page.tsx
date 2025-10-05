'use client';

import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";

const detail = serviceDetails["seo-geo"];

const SeoGeo = () => {
  return <PageHero {...detail} />;
};

export default SeoGeo;

