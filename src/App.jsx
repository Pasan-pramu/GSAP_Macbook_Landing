import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProductViewer from "./components/ProductViewer.jsx";
import {ScrollTrigger,SplitText} from "gsap/all";
import gsap from "gsap";
import Showcase from "./components/Showcase.jsx";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
       <main>
           <Navbar/>
           <Hero/>
           <ProductViewer/>
           <Showcase/>
       </main>
    )
}
export default App
