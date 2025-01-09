import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import About from './Components/About'
import Services from './Components/Services'
import MyWork from './Components/MyWork'
import Experiences from './Components/Experiences'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Slide} />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <MyWork />
      <Experiences />
      <Contact />
      <Footer />
    </>
  )
}

export default App
