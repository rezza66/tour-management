import React from "react"; 

const CommonSection = ({ title }) => {
  return (
    <section
      className="relative bg-cover bg-center h-80 flex items-center justify-center text-center text-white"
      style={{ backgroundImage: 'url("../assets/images/tour.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
      </div>
    </section>
  );
};

export default CommonSection;
