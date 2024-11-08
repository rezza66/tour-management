import React from "react";
import worldImg from "../assets/images/world.png";
import heroImg from "../assets/images/heroImg.jpg";
import heroImg3 from "../assets/images/heroImg3.jpg";
import heroImg2 from "../assets/images/heroimg2.jpg";
import Servicelist from "../services/service";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";

function Home() {
  return (
    <>
      <section className="py-12 md:px-20">
        <div className="mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 pt-12">
              <div className=" flex items-center">
                <h1 className="text-2xl">Know Before You Go</h1>
                <img src={worldImg} alt="World" className="ml-4 w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold mt-4">
                Traveling opens the door to creating{" "}
                <span className="text-primary">memories</span>
              </h1>
              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                tenetur animi nam recusandae tempora deserunt nemo quo modi quos
                dolores assumenda exercitationem error, magni enim. Illum amet
                vel nostrum nulla.
              </p>
            </div>
            <div className="lg:col-span-2">
              <img
                src={heroImg}
                alt="Hero 1"
                className="w-full h-[350px] rounded-[20px] border border-neutral-content object-cover shadow-lg"
              />
            </div>
            <div className="lg:col-span-2">
              <div className=" mt-3 ">
                <img
                  src={heroImg3}
                  controls
                  className="w-full h-[350px] rounded-[20px] border border-neutral-content object-cover shadow-lg"
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className=" mt-6">
                <img
                  src={heroImg2}
                  alt="Hero 2"
                  className="w-full h-[350px] rounded-[20px] border border-neutral-content object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex py-12 md:px-20">
          <div className="font-bold text-4xl pt-4">
            <h5>What we serve</h5>
            <h2>We offer our best services</h2>
          </div>
          <Servicelist />
        </div>
      </section>

      <section>
        <div className="md:px-20 py-12 ">           
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-primary mt-4">Our Featured Tours</h2>
                </div>
            <FeaturedTourList />
        </div>
      </section>

      <section>
        <div className="py-9 md:px-20">           
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-primary mt-4">Gallery</h2>
                </div>
            <MasonryImagesGallery />
        </div>
      </section>
    </>
  );
}

export default Home;
