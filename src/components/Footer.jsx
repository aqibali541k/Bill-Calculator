import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white text-xs py-3 mt-6 no-print">
      <div className="max-w-xl mx-auto text-center leading-relaxed">
        <p className="font-medium">
          Owner: <span className="font-normal">Aqib Shabbir</span> | 📞
          0307-8244507
        </p>
        <p>📍 Airport Chowk, Faisalabad</p>
        <p className="opacity-80 mt-1">
          © {new Date().getFullYear()} Grocery Store Bill Generator
        </p>
      </div>
    </footer>
  );
};

export default Footer;
