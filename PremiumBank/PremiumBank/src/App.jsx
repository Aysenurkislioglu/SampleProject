import "./styles/global.scss";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./sections/HomePage/HomePage";
import Cards from "./sections/Cards/Cards";
import Partners from "./sections/Partners/Partners";
import MobileApp from "./sections/MobileApp/MobileApp";
import Blog from "./sections/Blog/Blog";
import Advantages from "./sections/Advantages/Advantages";
import ApplicationForm from "./sections/ApplicationForm/ApplicationForm";

function App() {

  return (
    <>
    <Navbar />
    <HomePage />
    <Cards />
    <Partners />
    <MobileApp />
    <Blog />
    <Advantages />
    <ApplicationForm />
    <Footer />
      </>
  )
}

export default App
