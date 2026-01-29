import React from "react";

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-white text-xs py-3 mt-6 no-print">
      <div className="max-w-xl mx-auto text-center leading-relaxed">
        <p className="font-medium">
          Owner: <span className="font-normal">Aqib Ali</span> | 📞 0300-1234567
        </p>
        <p>📍 Ghanta Ghar, Faisalabad</p>
        <p className="opacity-80 mt-1">
          © {new Date().getFullYear()} AQIB GENERAL STORE
        </p>
      </div>
    </footer>
  );
};

export default Footer;
