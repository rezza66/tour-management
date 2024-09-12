import React from 'react';
import maleTourist from '../assets/images/male-tourist.png';

const Newsletter = () => {
  return (
    <section className="bg-blue-200 py-10">
      <div className="flex py-12 md:px-20">
          <div className=" lg:w-1/2">           
              <h2 className="text-3xl text-gray-800 font-bold mb-6">
                Subscribe now to get useful traveling information.
              </h2>
              <div className="flex items-center mb-6 bg-primary p-2 rounded-lg shadow-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 border-none px-4 py-2 text-lg text-gray-100 outline-none"
                />
                <button className="btn   ml-4">
                  Subscribe
                </button>
              </div>
              <p className="text-lg text-gray-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. A autem aspernatur doloribus explicabo ullam error earum omnis voluptatum porro optio.
              </p>          
          </div>
            <div>
              <img src={maleTourist} alt="Tourist" />
            </div>      
      </div>
    </section>
  );
};

export default Newsletter;
