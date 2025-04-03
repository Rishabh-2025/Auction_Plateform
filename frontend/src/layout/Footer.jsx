import React from 'react';
import GavelIcon from '@mui/icons-material/Gavel';
export default function Footer() {
    const sections = [
      {
        title: "Company",
        links: ["About", "Careers", "How it works", "Contact Us"],
      },
      {
        title: "Auctions",
        links: ["Live Auctions", "Upcoming Auctions", "Past Auctions", "Sell an Item"],
      },
      {
        title: "Support",
        links: ["Help/FAQ", "Buyer Guide", "Seller Guide", "Terms & Conditions"],
      },
    ];
  
    return (
      <footer className="bg-slate-900 text-slate-200 py-10 ">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            {/* Logo and Description */}
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="flex items-center gap-2 text-2xl text-[#0099A8]  font-bold">
                <span className="text-[#0099A8]"><GavelIcon /></span> Bid Palace.
              </div>
              <p className="text-sm mt-2 max-w-sm">
                Join the best online auction platform. Bid, buy, and sell with ease.
              </p>
              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                <span className="bg-slate-700 p-2 rounded-full">📷</span>
                <span className="bg-slate-700 p-2 rounded-full">🔗</span>
                <span className="bg-slate-700 p-2 rounded-full">❌</span>
              </div>
            </div>
  
            {/* Links Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm text-center md:text-left">
              {sections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-[#0099A8]">{section.title}</h3>
                  <ul className="mt-2 space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="mt-8 text-center text-xs text-slate-400 border-t border-slate-700 pt-4">
            <p>&copy; 2025 - Bid Palace. All Rights Reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-white">Privacy policy</a>
              <span>|</span>
              <a href="#" className="hover:text-white">Terms & conditions</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  