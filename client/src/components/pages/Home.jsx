import React from 'react'
import { Link } from 'react-router-dom'
import Heros from './wrappers/Home/Heros'
import Services from './wrappers/Home/Services'
import Stats from './wrappers/Home/Stats'
import Testimonials from './wrappers/Home/Testimonials'
import Teams from './wrappers/Home/Teams'
import Pricings from './wrappers/Home/Pricings'
export const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-4  max -w-5xl px-6">
        <Heros />
        <Services />
        <Stats />
        <Testimonials />
        <Teams />
        <Pricings />
      </div>
    </>
  );
}
