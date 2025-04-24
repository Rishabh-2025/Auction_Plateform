import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './layout/Navbar'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Blog from './pages/Blog';
import About from './pages/Aboutus';
import Dashboard from './pages/dashboard/Dashboard';
import Footer from './layout/Footer';
import Auction from './pages/Auction';
import Leaderboard from './components/Auction/LeaderBoard';
import ContactUs from './pages/ContactUs';
import AuctionItem from './pages/AuctionItem';
import ViewAuctionDetails from './pages/ViewAuctionDetails';
import Error from "./layout/Error";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/slices/userSlice'; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Re-fetch user from cookie-based session
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/about-us' element={<About/>}/>
        <Route path='/auction' element={<Auction/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path='/auction/item/:id' element={<AuctionItem/>}/>
        <Route path='/auction/details/:id' element={<ViewAuctionDetails/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      <Footer/>
      <ToastContainer position='top-right' />
    </Router>
  )
}

export default App;
