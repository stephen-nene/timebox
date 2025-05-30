// import React from 'react'
// import { Link } from 'react-router-dom'
// import Heros from './wrappers/Home/Heros'
// import Services from './wrappers/Home/Services'
// import Stats from './wrappers/Home/Stats'
// import Testimonials from './wrappers/Home/Testimonials'
// import Teams from './wrappers/Home/Teams'
// import Pricings from './wrappers/Home/Pricings'
// export const Home = () => {
//   return (
//     <>
//       <div className="flex flex-col gap-4  max -w-5xl px-6">
//         <Heros />
//         <Services />
//         <Stats />
//         {/* <Testimonials /> */}
//         <Teams />
//         {/* <Pricings /> */}
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
 FcAlarmClock, 
 FcCalendar, 
 FcLineChart, 
 FcSettings, 
 FcOk, 
 FcSurvey,
 FcBusinessman,
 FcCustomerSupport,
 FcGlobe,
 FcLock,
 FcFlashOn,
 FcWorkflow
} from 'react-icons/fc';
import { 
 AiOutlineArrowRight, 
 AiOutlinePlayCircle, 
 AiOutlineStar,
 AiOutlineCheckCircle,
 AiOutlineClockCircle,
 AiOutlineBarChart,
 AiOutlineTeam
} from 'react-icons/ai';

const heroImages = [
 "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
 "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop",
 "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
 "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
];

const pricingPlans = [
 {
   name: "Starter",
   monthly: { price: 0, yearlyDiscount: 0 },
   yearly: { price: 0, yearlyDiscount: 0 },
   features: [
     "Up to 50 time blocks per month",
     "Basic calendar integration",
     "Simple task tracking",
     "Email support",
     "Mobile app access"
   ],
   popular: false,
   color: "blue"
 },
 {
   name: "Professional",
   monthly: { price: 12.99, yearlyDiscount: 20 },
   yearly: { price: 124.99, yearlyDiscount: 20 },
   features: [
     "Unlimited time blocks",
     "Advanced analytics & reports",
     "Team collaboration tools",
     "Priority support",
     "Calendar sync (Google, Outlook)",
     "Custom templates",
     "Time tracking automation"
   ],
   popular: true,
   color: "purple"
 },
 {
   name: "Enterprise",
   monthly: { price: 29.99, yearlyDiscount: 25 },
   yearly: { price: 269.99, yearlyDiscount: 25 },
   features: [
     "Everything in Professional",
     "Advanced team management",
     "Custom integrations",
     "SSO & advanced security",
     "Dedicated account manager",
     "Custom branding",
     "API access",
     "Advanced reporting suite"
   ],
   popular: false,
   color: "emerald"
 }
];

export default function Home() {
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [isYearly, setIsYearly] = useState(false);
 const [activeTestimonial, setActiveTestimonial] = useState(0);

 useEffect(() => {
   const interval = setInterval(() => {
     setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
   }, 5000);
   return () => clearInterval(interval);
 }, []);

 useEffect(() => {
   const testimonialInterval = setInterval(() => {
     setActiveTestimonial((prev) => (prev + 1) % 3);
   }, 4000);
   return () => clearInterval(testimonialInterval);
 }, []);

 const features = [
   {
     icon: <FcAlarmClock className="text-4xl" />,
     title: "Smart Time Blocking",
     description: "Intelligently organize your day with AI-powered time blocks that adapt to your productivity patterns."
   },
   {
     icon: <FcCalendar className="text-4xl" />,
     title: "Calendar Integration",
     description: "Seamlessly sync with Google Calendar, Outlook, and Apple Calendar for unified scheduling."
   },
   {
     icon: <FcLineChart className="text-4xl" />,
     title: "Productivity Analytics",
     description: "Track your progress with detailed insights and reports to optimize your time management."
   },
   {
     icon: <FcSettings className="text-4xl" />,
     title: "Custom Workflows",
     description: "Create personalized workflows and templates that match your unique working style."
   },
   {
     icon: <FcBusinessman className="text-4xl" />,
     title: "Team Collaboration",
     description: "Coordinate with your team, share schedules, and collaborate on projects efficiently."
   },
   {
     icon: <FcSurvey className="text-4xl" />,
     title: "Goal Tracking",
     description: "Set and monitor your goals with visual progress tracking and milestone celebrations."
   }
 ];

 const stats = [
   { number: "50K+", label: "Active Users", icon: <AiOutlineTeam /> },
   { number: "2M+", label: "Hours Saved", icon: <AiOutlineClockCircle /> },
   { number: "98%", label: "Satisfaction Rate", icon: <AiOutlineStar /> },
   { number: "150K+", label: "Tasks Completed", icon: <AiOutlineCheckCircle /> }
 ];

 const testimonials = [
   {
     name: "Sarah Johnson",
     role: "Product Manager at TechCorp",
     content: "This time management tool completely transformed how I organize my day. I've increased my productivity by 40% in just two months!",
     avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
   },
   {
     name: "Michael Chen",
     role: "Freelance Designer",
     content: "As a freelancer, time is money. This platform helps me track every minute and maximize my billable hours. Absolutely essential!",
     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
   },
   {
     name: "Emma Rodriguez",
     role: "Marketing Director",
     content: "The team collaboration features are game-changing. We've reduced meeting time by 30% and improved project delivery speed significantly.",
     avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
   }
 ];

 return (
   <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
     {/* Hero Section */}
     <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
       <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
       <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
         <div className="grid lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-8">
             <div className="space-y-4">
               <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                 <FcFlashOn className="mr-2" />
                 Boost Your Productivity Today
               </div>
               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                 Master Your Time,
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                   {" "}Transform Your Life
                 </span>
               </h1>
               <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                 Revolutionary time management platform that helps professionals and teams 
                 achieve 3x more productivity through intelligent time blocking and AI-powered insights.
               </p>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4">
               <Link
                 to="/register"
                 className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
               >
                 Start Free Trial
                 <AiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Link>
               <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                 <AiOutlinePlayCircle className="mr-2 text-2xl" />
                 Watch Demo
               </button>
             </div>

             <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
               <div className="flex items-center">
                 <AiOutlineCheckCircle className="mr-2 text-green-500" />
                 No credit card required
               </div>
               <div className="flex items-center">
                 <AiOutlineCheckCircle className="mr-2 text-green-500" />
                 14-day free trial
               </div>
             </div>
           </div>

           <div className="relative">
             <div className="relative overflow-hidden rounded-2xl shadow-2xl">
               <img
                 src={heroImages[currentImageIndex]}
                 alt="Time Management Dashboard"
                 className="w-full h-96 object-cover transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
             </div>
             
             {/* Floating Cards */}
             <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg animate-bounce">
               <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-sm font-medium">Live Tracking</span>
               </div>
             </div>
             
             <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
               <div className="text-2xl font-bold text-blue-600">+40%</div>
               <div className="text-sm text-gray-600 dark:text-gray-400">Productivity</div>
             </div>
           </div>
         </div>
       </div>
     </section>

     {/* Stats Section */}
     <section className="py-16 bg-gray-50 dark:bg-gray-800">
       <div className="max-w-7xl mx-auto px-6 lg:px-8">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
           {stats.map((stat, index) => (
             <div
               key={index}
               className="text-center group hover:scale-105 transition-transform duration-300"
             >
               <div className="text-4xl text-blue-600 dark:text-blue-400 mb-2 flex justify-center">
                 {stat.icon}
               </div>
               <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
               <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
             </div>
           ))}
         </div>
       </div>
     </section>

     {/* Features Section */}
     <section className="py-20">
       <div className="max-w-7xl mx-auto px-6 lg:px-8">
         <div className="text-center mb-16">
           <h2 className="text-4xl lg:text-5xl font-bold mb-6">
             Powerful Features for
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
               {" "}Peak Performance
             </span>
           </h2>
           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
             Everything you need to take control of your time and boost productivity to new heights.
           </p>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {features.map((feature, index) => (
             <div
               key={index}
               className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
             >
               <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                 {feature.icon}
               </div>
               <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                 {feature.title}
               </h3>
               <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                 {feature.description}
               </p>
             </div>
           ))}
         </div>
       </div>
     </section>

     {/* Testimonials Section */}
     <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
       <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
         <h2 className="text-4xl lg:text-5xl font-bold mb-16">
           Loved by Thousands of Professionals
         </h2>

         <div className="relative">
           <div className="overflow-hidden">
             <div 
               className="flex transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
             >
               {testimonials.map((testimonial, index) => (
                 <div key={index} className="w-full flex-shrink-0 px-4">
                   <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                     <div className="flex justify-center mb-6">
                       {[...Array(5)].map((_, i) => (
                         <AiOutlineStar key={i} className="text-2xl text-yellow-400 fill-current" />
                       ))}
                     </div>
                     <blockquote className="text-xl italic mb-8 text-gray-700 dark:text-gray-300">
                       "{testimonial.content}"
                     </blockquote>
                     <div className="flex items-center justify-center space-x-4">
                       <img
                         src={testimonial.avatar}
                         alt={testimonial.name}
                         className="w-12 h-12 rounded-full"
                       />
                       <div className="text-left">
                         <div className="font-semibold">{testimonial.name}</div>
                         <div className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</div>
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           <div className="flex justify-center mt-8 space-x-2">
             {testimonials.map((_, index) => (
               <button
                 key={index}
                 onClick={() => setActiveTestimonial(index)}
                 className={`w-3 h-3 rounded-full transition-colors ${
                   index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                 }`}
               />
             ))}
           </div>
         </div>
       </div>
     </section>

     {/* Pricing Section */}
     <section className="py-20">
       <div className="max-w-7xl mx-auto px-6 lg:px-8">
         <div className="text-center mb-16">
           <h2 className="text-4xl lg:text-5xl font-bold mb-6">
             Choose Your Perfect Plan
           </h2>
           <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
             Start free, scale as you grow. All plans include our core time management features.
           </p>

           {/* Pricing Toggle */}
           <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
             <button
               onClick={() => setIsYearly(false)}
               className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                 !isYearly
                   ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                   : 'text-gray-600 dark:text-gray-400'
               }`}
             >
               Monthly
             </button>
             <button
               onClick={() => setIsYearly(true)}
               className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                 isYearly
                   ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                   : 'text-gray-600 dark:text-gray-400'
               }`}
             >
               Yearly
               <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                 Save 25%
               </span>
             </button>
           </div>
         </div>

         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
           {pricingPlans.map((plan, index) => (
             <div
               key={index}
               className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
                 plan.popular 
                   ? 'ring-4 ring-purple-500 ring-opacity-50 transform scale-105' 
                   : 'hover:scale-105'
               }`}
             >
               {plan.popular && (
                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                   <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                     Most Popular
                   </span>
                 </div>
               )}

               <div className="p-8">
                 <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                 
                 <div className="mb-6">
                   <div className="flex items-baseline">
                     <span className="text-4xl font-bold">
                       ${isYearly ? plan.yearly.price : plan.monthly.price}
                     </span>
                     <span className="text-gray-600 dark:text-gray-400 ml-2">
                       /{isYearly ? 'year' : 'month'}
                     </span>
                   </div>
                   {isYearly && plan.yearly.yearlyDiscount > 0 && (
                     <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                       Save {plan.yearly.yearlyDiscount}% with yearly billing
                     </div>
                   )}
                 </div>

                 <ul className="space-y-4 mb-8">
                   {plan.features.map((feature, featureIndex) => (
                     <li key={featureIndex} className="flex items-start">
                       <FcOk className="text-2xl mr-3 flex-shrink-0 mt-0.5" />
                       <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                     </li>
                   ))}
                 </ul>

                 <Link
                   to="/register"
                   className={`w-full inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                     plan.popular
                       ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                       : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                   }`}
                 >
                   {plan.monthly.price === 0 ? 'Start Free' : 'Start Trial'}
                   <AiOutlineArrowRight className="ml-2" />
                 </Link>
               </div>
             </div>
           ))}
         </div>

         <div className="text-center mt-12">
           <p className="text-gray-600 dark:text-gray-400">
             All plans include a 14-day free trial. No credit card required.
           </p>
         </div>
       </div>
     </section>

     {/* CTA Section */}
     <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
       <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center text-white">
         <h2 className="text-4xl lg:text-5xl font-bold mb-6">
           Ready to Transform Your Productivity?
         </h2>
         <p className="text-xl mb-8 opacity-90">
           Join thousands of professionals who have already revolutionized their time management.
         </p>
         
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link
             to="/register"
             className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-blue-600 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
           >
             Start Your Free Trial
             <AiOutlineArrowRight className="ml-2" />
           </Link>
           <Link
             to="/contact"
             className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
           >
             <FcCustomerSupport className="mr-2 text-2xl" />
             Contact Sales
           </Link>
         </div>

         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           <div className="flex items-center justify-center space-x-2">
             <FcLock className="text-2xl" />
             <span>Enterprise Security</span>
           </div>
           <div className="flex items-center justify-center space-x-2">
             <FcGlobe className="text-2xl" />
             <span>Global Support</span>
           </div>
           <div className="flex items-center justify-center space-x-2">
             <FcWorkflow className="text-2xl" />
             <span>Easy Integration</span>
           </div>
         </div>
       </div>
     </section>
   </div>
 );
}