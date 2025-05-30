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
// // 

import React, { useState, useEffect } from "react";
import { 
  Button, 
  Card, 
  Avatar, 
  Rate, 
  Statistic, 
  Badge, 
  Timeline,
  Carousel,
  Row,
  Col,
  Space,
  Divider
} from 'antd';
import {
  FcClock,
  FcCalendar,
  FcBarChart,
  FcApproval,
  FcBullish,
  FcCollaboration,
  FcSettings,
  FcLike,
  FcFlashOn,
  FcGlobe,
  
  FcSmartphoneTablet,
  FcTodoList,
  FcSynchronize,
  FcAutomatic,
  FcAdvance
} from 'react-icons/fc';
import {
  AiOutlinePlayCircle,
  AiOutlineArrowRight,
  AiOutlineStar,
  AiOutlineCheckCircle,
  AiOutlineTeam,
  AiOutlineTrophy
} from 'react-icons/ai';
import { FaShield } from "react-icons/fa6";

const { Meta } = Card;

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Hero images
  const heroImages = [
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1434626738845-b8b7e52ac0c8?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Hero Section
  const HeroSection = () => (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-100 rounded-full opacity-10 animate-bounce"></div>
      </div>

      <Row className="max-w-7xl mx-auto px-6 relative z-10" gutter={[48, 32]} align="middle">
        <Col xs={24} lg={12} className="text-center lg:text-left">
          <Badge.Ribbon text="New Features!" color="blue">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master Your Time,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Maximize Success
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Transform your productivity with intelligent timeboxing. Plan, track, and optimize every moment of your day with our advanced time management platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="primary" 
                  size="large" 
                  className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 border-0 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  icon={<AiOutlineArrowRight />}
                  iconPosition="end"
                >
                  Start Free Trial
                </Button>
                
                <Button 
                  size="large" 
                  className="h-14 px-8 text-lg font-semibold border-2 border-blue-500 text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  icon={<AiOutlinePlayCircle />}
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <Avatar key={i} size={40} src={`https://i.pravatar.cc/40?img=${i}`} className="border-2 border-white" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Rate disabled defaultValue={5} className="text-sm" />
                    <span className="text-gray-600 ml-2">4.9/5 from 50K+ users</span>
                  </div>
                </div>
              </div>
            </div>
          </Badge.Ribbon>
        </Col>

        <Col xs={24} lg={12}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <img
              src={heroImages[currentImageIndex]}
              alt="Time Management Dashboard"
              className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl transition-all duration-1000 hover:scale-105"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {heroImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );

  // Stats Section
  const StatsSection = () => (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Row gutter={[32, 32]} className="text-center">
          <Col xs={12} md={6}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Statistic
                title="Time Saved Daily"
                value={2.5}
                suffix="Hours"
                valueStyle={{ color: '#3f8600', fontSize: '2.5rem', fontWeight: 'bold' }}
                prefix={<FcClock className="text-3xl" />}
              />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Statistic
                title="Active Users"
                value={50000}
                suffix="+"
                valueStyle={{ color: '#1890ff', fontSize: '2.5rem', fontWeight: 'bold' }}
                prefix={<FcCollaboration className="text-3xl" />}
              />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Statistic
                title="Tasks Completed"
                value={1200000}
                suffix="+"
                valueStyle={{ color: '#722ed1', fontSize: '2.5rem', fontWeight: 'bold' }}
                prefix={<FcApproval className="text-3xl" />}
              />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Statistic
                title="Satisfaction Rate"
                value={98}
                suffix="%"
                valueStyle={{ color: '#fa8c16', fontSize: '2.5rem', fontWeight: 'bold' }}
                prefix={<FcLike className="text-3xl" />}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );

  // Features Section
  const FeaturesSection = () => {
    const features = [
      {
        icon: <FcTodoList className="text-5xl" />,
        title: "Smart Task Management",
        description: "Organize tasks with AI-powered prioritization and automated scheduling suggestions."
      },
      {
        icon: <FcCalendar className="text-5xl" />,
        title: "Dynamic Time Blocking",
        description: "Visually plan your day with drag-and-drop time blocking and real-time adjustments."
      },
      {
        icon: <FcBarChart className="text-5xl" />,
        title: "Advanced Analytics",
        description: "Get detailed insights into your productivity patterns and time allocation."
      },
      {
        icon: <FcSynchronize className="text-5xl" />,
        title: "Multi-Platform Sync",
        description: "Access your schedule anywhere with seamless synchronization across all devices."
      },
      {
        icon: <FcAutomatic className="text-5xl" />,
        title: "Automated Workflows",
        description: "Set up recurring tasks and automated reminders to streamline your routine."
      },
      {
        icon: <FcAdvance className="text-5xl" />,
        title: "Team Collaboration",
        description: "Share schedules, assign tasks, and collaborate effectively with team members."
      }
    ];

    return (
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Maximum Productivity
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to take control of your time and boost your productivity to new heights.
            </p>
          </div>

          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card 
                  className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                  hoverable
                >
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  };

  // Testimonials Section
  const TestimonialsSection = () => {
    const testimonials = [
      {
        name: "Sarah Johnson",
        role: "Project Manager at TechCorp",
        avatar: "https://i.pravatar.cc/80?img=1",
        rating: 5,
        content: "This app completely transformed how I manage my day. I've increased my productivity by 40% and finally feel in control of my schedule."
      },
      {
        name: "Mike Chen",
        role: "Entrepreneur",
        avatar: "https://i.pravatar.cc/80?img=2",
        rating: 5,
        content: "The timeboxing feature is a game-changer. I can now balance multiple projects effortlessly while maintaining work-life balance."
      },
      {
        name: "Emily Davis",
        role: "Marketing Director",
        avatar: "https://i.pravatar.cc/80?img=3",
        rating: 5,
        content: "Love the analytics dashboard! It shows exactly where my time goes and helps me optimize my daily routine continuously."
      }
    ];

    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who've transformed their productivity
            </p>
          </div>

          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="space-y-4">
                    <Rate disabled defaultValue={testimonial.rating} className="text-yellow-400" />
                    <p className="text-gray-700 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3 pt-4 border-t">
                      <Avatar size={50} src={testimonial.avatar} />
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-500 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  };

  // Pricing Section
  const PricingSection = () => {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
      {
        name: "Free",
        monthly: { price: 0, features: ["50 tasks/month", "Basic analytics", "Mobile app"] },
        yearly: { price: 0, features: ["600 tasks/year", "Basic analytics", "Mobile app"] },
        popular: false
      },
      {
        name: "Pro",
        monthly: { price: 15, features: ["Unlimited tasks", "Advanced analytics", "Team collaboration", "Priority support"] },
        yearly: { price: 150, features: ["Unlimited tasks", "Advanced analytics", "Team collaboration", "Priority support"] },
        popular: true
      },
      {
        name: "Enterprise",
        monthly: { price: 45, features: ["Everything in Pro", "Custom integrations", "Dedicated support", "Advanced security"] },
        yearly: { price: 450, features: ["Everything in Pro", "Custom integrations", "Dedicated support", "Advanced security"] },
        popular: false
      }
    ];

    return (
      <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start free, upgrade when you need more power
            </p>
            
            <div className="flex justify-center mb-8">
              <div className="bg-white p-1 rounded-full shadow-md">
                <Button
                  type={!isYearly ? "primary" : "default"}
                  onClick={() => setIsYearly(false)}
                  className="px-6 py-2 rounded-full"
                >
                  Monthly
                </Button>
                <Button
                  type={isYearly ? "primary" : "default"}
                  onClick={() => setIsYearly(true)}
                  className="px-6 py-2 rounded-full ml-1"
                >
                  Yearly (Save 17%)
                </Button>
              </div>
            </div>
          </div>

          <Row gutter={[32, 32]} justify="center">
            {plans.map((plan, index) => {
              const currentPlan = isYearly ? plan.yearly : plan.monthly;
              return (
                <Col xs={24} md={8} key={index}>
                  <Badge.Ribbon text="Most Popular" color="gold" className={plan.popular ? '' : 'hidden'}>
                    <Card 
                      className={`h-full text-center border-2 transition-all duration-300 transform hover:scale-105 ${
                        plan.popular 
                          ? 'border-blue-500 shadow-2xl' 
                          : 'border-gray-200 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                          <div className="text-4xl font-bold text-blue-600">
                            ${currentPlan.price}
                            <span className="text-lg text-gray-500 font-normal">
                              /{isYearly ? 'year' : 'month'}
                            </span>
                          </div>
                        </div>

                        <Divider />

                        <div className="space-y-3">
                          {currentPlan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center justify-center space-x-2">
                              <AiOutlineCheckCircle className="text-green-500 text-lg" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button
                          type={plan.popular ? "primary" : "default"}
                          size="large"
                          className="w-full mt-6 h-12 font-semibold"
                        >
                          {plan.name === "Free" ? "Get Started" : "Start Free Trial"}
                        </Button>
                      </div>
                    </Card>
                  </Badge.Ribbon>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  };

  // CTA Section
  const CTASection = () => (
    <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Productivity?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join over 50,000 professionals who've already mastered their time with our platform.
        </p>
        <Space size="large">
          <Button 
            type="primary" 
            size="large" 
            className="h-14 px-8 text-lg font-semibold bg-white text-blue-600 border-0 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Your Free Trial
          </Button>
          <Button 
            size="large" 
            className="h-14 px-8 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Schedule Demo
          </Button>
        </Space>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}