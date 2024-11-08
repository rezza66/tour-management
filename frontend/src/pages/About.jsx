import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl p-8 bg-white bg-opacity-90 shadow-2xl rounded-box backdrop-blur-sm">
        <h1 className="text-5xl font-bold text-center mb-5 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Tentang Kami
        </h1>
        <div className="divider before:bg-purple-300 after:bg-pink-300"></div>
        <p className="text-lg mb-6 text-gray-700 leading-relaxed">
          Selamat datang di halaman Tentang Kami. Kami adalah perusahaan tour
          management yang berdedikasi untuk memberikan pengalaman perjalanan
          yang tak terlupakan kepada klien kami. Dengan semangat petualangan dan
          keahlian dalam industri pariwisata, kami terus berinovasi untuk
          menciptakan paket tur yang unik dan menarik, mengubah cara dunia
          menjelajahi keindahan alam dan budaya.
        </p>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg shadow-inner mb-6">
          <h2 className="text-3xl font-semibold mb-4 text-purple-600">
            Visi Kami
          </h2>
          <p className="text-lg text-gray-700">
            Menjadi pemimpin global dalam industri tour management,
            menginspirasi orang-orang untuk menjelajahi dunia dengan cara yang
            bertanggung jawab dan berkelanjutan, menciptakan kenangan abadi bagi
            setiap pelanggan kami.
          </p>
        </div>
        <div className="bg-gradient-to-r from-pink-100 to-red-100 p-6 rounded-lg shadow-inner mb-6">
          <h2 className="text-3xl font-semibold mb-4 text-pink-600">
            Misi Kami
          </h2>
          <p className="text-lg text-gray-700">
            Misi kami adalah untuk memberikan layanan tour management terbaik
            yang memadukan petualangan, edukasi, dan kenyamanan. Kami
            berkomitmen untuk:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>
              Merancang paket tur yang unik dan disesuaikan dengan kebutuhan
              setiap klien
            </li>
            <li>
              Mempromosikan pariwisata berkelanjutan dan mendukung komunitas
              lokal
            </li>
            <li>
              Menyediakan layanan pelanggan yang luar biasa di setiap tahap
              perjalanan
            </li>
            <li>
              Memastikan keamanan dan kenyamanan tertinggi bagi setiap pelanggan
              kami
            </li>
          </ul>
        </div>
        <div className="text-center mt-8">
          <button className="btn btn-primary btn-lg bg-gradient-to-r from-purple-500 to-pink-500 border-none hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
