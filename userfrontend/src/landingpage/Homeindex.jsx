
import Herosection from './herosection';
import Navbar from '../components/Navbar';
import Category from './category';
import Tentor from './tentor';
import About from './About';
import Testimoni from './Testimoni';
import JoinUs from './Joinus';
import CalltoAction from './Calltoaction';
import Footer from '../components/Footer';



function Homeindex() {
  return (
    <div>
      
<Navbar />
<Herosection />
<Category />
<Tentor />
<About />
<Testimoni />
<JoinUs />
<CalltoAction />
<Footer />
</div>
  )
}

export default Homeindex