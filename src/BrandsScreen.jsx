
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


export default function BrandsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const isBrands = location.pathname === '/brands';
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fff6f6] to-[#fbe9e9] overflow-hidden relative transition-colors duration-500 flex flex-col items-center">
      <div className="mt-8 text-center">
        <div className="text-[#b8001f] font-black text-6xl leading-none drop-shadow-lg tracking-tight">st.</div>
        <div className="text-[#b8001f] text-lg font-medium drop-shadow mb-4">Student Tribe</div>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="flex rounded-full overflow-hidden shadow-lg">
          <button
            className={`px-8 py-2 font-semibold focus:outline-none transition-colors duration-300 ${!isBrands ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white' : 'bg-[#232326] text-gray-400'}`}
            onClick={() => navigate('/')}
          >
            Students
          </button>
          <button
            className={`px-8 py-2 font-semibold focus:outline-none transition-colors duration-300 ${isBrands ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white' : 'bg-[#232326] text-gray-400'}`}
            onClick={() => navigate('/brands')}
          >
            Brands
          </button>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-extrabold text-[#2d1c1c] mb-2">Partner with the next generation!</h1>
        <p className="text-lg text-[#2d1c1c] mb-4">Connect with students, host events, and build your brand on campus.<br/>Unlock new opportunities with Student Tribe.</p>
        <button className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white font-semibold text-lg shadow-lg transition-transform hover:scale-105">Get Started</button>
      </div>
      <div className="flex flex-row justify-center gap-8 mt-12 px-4 w-full max-w-6xl">
        <img src="https://media.istockphoto.com/id/1947499362/photo/happy-group-of-business-people-discussing-strategy-during-team-meeting-at-the-office-desk.jpg?s=612x612&w=0&k=20&c=UXPrlQx09d8EP4_kTdAa-vC2LxD_ppY1tiG7eTPGVbE=" alt="Brand Event 1" className="w-64 h-80 object-cover rounded-3xl shadow-lg" />
        <img src="https://thumbs.dreamstime.com/b/young-professional-team-top-view-young-modern-people-smar-young-professional-team-top-view-young-modern-people-smart-115214614.jpg" alt="Brand Event 2" className="w-64 h-80 object-cover rounded-3xl shadow-lg" />
        <img src="https://static.vecteezy.com/system/resources/thumbnails/013/577/994/small_2x/starting-new-working-day-as-a-team-top-view-of-group-of-six-young-people-holding-hands-together-and-smile-while-sitting-at-the-office-desk-photo.jpg" alt="Brand Event 3" className="w-64 h-80 object-cover rounded-3xl shadow-lg" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#2d1c1c] text-white font-bold text-xl px-4 py-8 rounded-l-xl tracking-widest rotate-90 flex items-center justify-center" style={{writingMode: 'vertical-rl'}}>ST SCHOOL</div>
    </div>
  );
}
