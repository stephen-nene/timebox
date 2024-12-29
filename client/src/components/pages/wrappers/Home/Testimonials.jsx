import React, { useState } from "react";
import { FaStar, FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      image: "https://readymadeui.com/profile_1.webp",
      text: "This app completely transformed my spending habits! I realized I was spending too much on coffee every month and managed to cut down by 50%.",
      name: "Jane Doe",
      role: "Freelance Designer",
      stars: 5,
    },
    {
      image: "https://readymadeui.com/profile_2.webp",
      text: "Tracking my daily expenses helped me save for my dream vacation. I love how simple and effective the app is.",
      name: "John Smith",
      role: "Marketing Manager",
      stars: 4,
    },
    {
      image: "https://readymadeui.com/profile_3.webp",
      text: "I had no idea how much I was spending on takeout. Thanks to this app, I now budget better and cook more at home!",
      name: "Emily Clark",
      role: "Software Developer",
      stars: 4,
    },
    {
      image: "https://readymadeui.com/profile_4.webp",
      text: "The visual breakdown of my expenses was a game-changer. Highly recommend it to anyone trying to get a handle on their finances.",
      name: "Michael Brown",
      role: "Entrepreneur",
      stars: 5,
    },
    {
      image: "https://readymadeui.com/profile_5.webp",
      text: "This app helped me identify and cut unnecessary subscriptions. I'm now saving an extra $200 every month!",
      name: "Sarah Wilson",
      role: "Teacher",
      stars: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const { image, text, name, role, stars } = testimonials[currentIndex];

  return (
    <div className="max-w-4xl mx-auto p-6 font-[sans-serif]">
      <div className="mb-12">
        <h2 className=" text-3xl font-extrabold">
          What Our Happy Clients Say
        </h2>
        <p className="text-sm mt-4 leading-relaxed">
          Hear from users who have transformed their financial habits with our
          app.
        </p>
      </div>

      <div className="grid md:grid-cols-3 items-center gap-12">
        <div>
          <img
            src="https://readymadeui.com/profile_5.webp"
            // src={image}
            className="w-[280px] rounded-lg shadow-[-20px_20px_0px_rgba(23,219,220,1)]"
            alt={name}
          />
        </div>

        <div className="md:col-span-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 fill-blue-200 inline rotate-180"
            viewBox="0 0 475.082 475.081"
          >
            <path d="M164.454 36.547H54.818c-15.229 0-28.171 5.33-38.832 15.987C5.33 63.193 0 76.135 0 91.365v109.632c0 15.229 5.327 28.169 15.986 38.826 10.66 10.656 23.606 15.988 38.832 15.988h63.953c7.611 0 14.084 2.666 19.414 7.994 5.33 5.325 7.994 11.8 7.994 19.417v9.131c0 20.177-7.139 37.397-21.413 51.675-14.275 14.271-31.499 21.409-51.678 21.409h-18.27c-4.952 0-9.233 1.813-12.851 5.427-3.615 3.614-5.424 7.898-5.424 12.847v36.549c0 4.941 1.809 9.233 5.424 12.848 3.621 3.613 7.898 5.427 12.851 5.427h18.271c19.797 0 38.688-3.86 56.676-11.566 17.987-7.707 33.546-18.131 46.68-31.265 13.131-13.135 23.553-28.691 31.261-46.679 7.707-17.987 11.562-36.877 11.562-56.671V91.361c0-15.23-5.33-28.171-15.987-38.828s-23.602-15.986-38.827-15.986zm294.635 15.987c-10.656-10.657-23.599-15.987-38.828-15.987H310.629c-15.229 0-28.171 5.33-38.828 15.987-10.656 10.66-15.984 23.601-15.984 38.831v109.632c0 15.229 5.328 28.169 15.984 38.826 10.657 10.656 23.6 15.988 38.828 15.988h63.953c7.611 0 14.089 2.666 19.418 7.994 5.324 5.328 7.994 11.8 7.994 19.417v9.131c0 20.177-7.139 37.397-21.416 51.675-14.274 14.271-31.494 21.409-51.675 21.409h-18.274c-4.948 0-9.233 1.813-12.847 5.427-3.617 3.614-5.428 7.898-5.428 12.847v36.549c0 4.941 1.811 9.233 5.428 12.848 3.613 3.613 7.898 5.427 12.847 5.427h18.274c19.794 0 38.684-3.86 56.674-11.566 17.984-7.707 33.541-18.131 46.676-31.265 13.134-13.135 23.562-28.695 31.265-46.679 7.706-17.983 11.563-36.877 11.563-56.671V91.361c-.003-15.23-5.328-28.171-15.992-38.827z"></path>
          </svg>

          <p className=" text-sm mt-6 leading-relaxed">{text}</p>

          <div className="flex space-x-1 mt-6">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={19}
                color={i < stars ? "#facc15" : "#CED5D8"}
              />
            ))}
          </div>

          <div className="mt-4">
            <p className=" text-base font-semibold">{name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{role}</p>
          </div>

          <div className="flex justify-end mt-4 space-x-4">
            <div
              className="bg-gray-200 w-10 h-10 grid items-center justify-center rounded-full cursor-pointer"
              onClick={prevTestimonial}
            >
              <FaAngleLeft size={22} />
            </div>
            <div
              className="bg-[#17dbdc] w-10 h-10 grid items-center justify-center rounded-full cursor-pointer"
              onClick={nextTestimonial}
            >
              <FaAngleRight size={22} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//   <div class="mt-4 font-[sans-serif] bg-white max-w-6xl max-md:max-w-md mx-auto">
//     <div class="mb-12 text-center">
//       <h2 class="text-gray-800 text-3xl font-extrabold">
//         What our happy client say
//       </h2>
//     </div>

//     <div class="grid md:grid-cols-3 gap-6">
//       <div class="p-6 rounded-lg mx-auto bg-gray-100 relative">
//         <div class="flex flex-wrap items-center gap-4">
//           <img
//             src="https://readymadeui.com/team-2.webp"
//             class="w-14 h-14 rounded-full border-4 border-white"
//           />
//           <div>
//             <h4 class="text-gray-800 text-sm whitespace-nowrap font-bold">
//               John Doe
//             </h4>
//             <p class="mt-0.5 text-xs text-gray-600">Founder of Rubik</p>
//           </div>
//         </div>

//         <div class="flex space-x-1 mt-4">
//           <FaStar size={19} color="#facc15" />
//           <FaStar size={19} color="#facc15" />
//           <FaStar size={19} color="#facc15" />

//           <FaStar size={19} color="#CED5D8" />
//           <FaStar size={19} color="#CED5D8" />
//         </div>

//         <div class="mt-6">
//           <p class="text-gray-800 text-sm leading-relaxed">
//             The service was amazing. I never had to wait that long for my
//             food. The staff was friendly and attentive, and the delivery was
//             impressively prompt.
//           </p>
//         </div>
//       </div>

//       <div class="p-6 rounded-lg mx-auto bg-gray-100 relative">
//         <div class="flex flex-wrap items-center gap-4">
//           <img
//             src="https://readymadeui.com/team-1.webp"
//             class="w-14 h-14 rounded-full border-4 border-white"
//           />
//           <div>
//             <h4 class="text-gray-800 text-sm whitespace-nowrap font-bold">
//               Mark Adair
//             </h4>
//             <p class="mt-0.5 text-xs text-gray-600">Founder of Alpha</p>
//           </div>
//         </div>

//         <div class="flex space-x-1 mt-4">
//         <FaStar size={19} color="#facc15" />
//           <FaStar size={19} color="#facc15" />
//           <FaStar size={19} color="#facc15" />

//           <FaStar size={19} color="#CED5D8" />
//           <FaStar size={19} color="#CED5D8" />
//         </div>

//         <div class="mt-6">
//           <p class="text-gray-800 text-sm leading-relaxed">
//             The service was amazing. I never had to wait that long for my
//             food. The staff was friendly and attentive, and the delivery was
//             impressively prompt.
//           </p>
//         </div>
//       </div>

//       <div class="p-6 rounded-lg mx-auto bg-gray-100 relative">
//         <div class="flex flex-wrap items-center gap-4">
//           <img
//             src="https://readymadeui.com/team-4.webp"
//             class="w-14 h-14 rounded-full border-4 border-white"
//           />
//           <div>
//             <h4 class="text-gray-800 text-sm whitespace-nowrap font-bold">
//               Simon Konecki
//             </h4>
//             <p class="mt-0.5 text-xs text-gray-600">Founder of Labar</p>
//           </div>
//         </div>

//         <div class="flex space-x-1 mt-4">
//         <FaStar size={19} color="#facc15" />
//           <FaStar size={19} color="#facc15" />
//           <FaStar size={19} color="#facc15" />

//           <FaStar size={19} color="#CED5D8" />
//           <FaStar size={19} color="#CED5D8" />
//         </div>

//         <div class="mt-6">
//           <p class="text-gray-800 text-sm leading-relaxed">
//             The service was amazing. I never had to wait that long for my
//             food. The staff was friendly and attentive, and the delivery was
//             impressively prompt.
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
