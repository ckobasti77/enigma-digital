'use client';

import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";

const detail = serviceDetails["web-development"];

const WebDevelopment = () => {
  return <PageHero {...detail} />;
};

export default WebDevelopment;

