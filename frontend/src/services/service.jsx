import React from 'react';
import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const serviceData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing."
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing."
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing."
  },
];

const ServiceList = () => {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {serviceData.map((item, index) => (
        <div key={index} className="card shadow-lg p-4 rounded-lg border border-orange-400">
          <div className="w-16 h-16 rounded-full mb-4">
            <img src={item.imgUrl} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <h5 className="text-lg font-semibold text-neutral-content">{item.title}</h5>
          <p className="text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
