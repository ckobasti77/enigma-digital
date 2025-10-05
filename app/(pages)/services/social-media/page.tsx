'use client';

import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";

const detail = serviceDetails["social-media"];

const SocialMedia = () => {
  return <PageHero {...detail} />;
};

export default SocialMedia;

