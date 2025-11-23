// import Vapi from "@vapi-ai/web";
// import { useState, useEffect } from "react";
 

// export const vapi = new Vapi("ed35ad80-a54e-4fd0-b7a9-5e61368d4ceb"); 

// function App() {

//   const [callStatus, setCallStatus] = useState("inactive");
//   const start = async () => {
//     setCallStatus("loading");
//     const response = vapi.start("3d102e32-5399-4651-b9a3-588950e9fc2f"); 
//   };
//   const stop = () => {
//     setCallStatus("loading");
//     vapi.stop();
//   };
//   useEffect(() => {
//     vapi.on("call-start", () => setCallStatus("active"));
//     vapi.on("call-end", () => setCallStatus('inactive'));
//     return () => vapi.removeAllListeners();
//   }, [])


//   return (
//     <div>
//       {callStatus === "inactive" ? (<button onClick={start}>Start</button>) : null}
//       {callStatus === "loading" ? <i>Loading...</i> : null}
//       {callStatus === "active" ? (<button onClick={stop}>Stop</button>) : null}
//     </div>
//   )
// }

// export default App




import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import SupportPage from './pages/SupportPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import EmailLoginPage from './pages/EmailLoginPage';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 flex flex-col">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLS45LTItMi0yaC04Yy0xLjEgMC0yIC45LTIgMnY4YzAgMS4xLjkgMiAyIDJoOGMxLjEgMCAyLS45IDItMnYtOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/email" element={<EmailLoginPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
