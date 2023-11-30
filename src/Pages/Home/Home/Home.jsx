import ContactUs from "../../Shared/ContactUs/ContactUs";
import Faq from "../../Shared/Faq/Faq";
import Banner from "../Banner";
import FeaturedCards from "../FeaturedCards/FeaturedCards";
import HowWeWork from "../HowWeWork/HowWeWork";
import SuccessCounter from "../SuccessCounter/SuccessCounter";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
             <Banner></Banner>
             <FeaturedCards></FeaturedCards>
             <HowWeWork></HowWeWork>
             <SuccessCounter></SuccessCounter>
             <Testimonial></Testimonial>
             <Faq></Faq>
             <div className="mt-24"><ContactUs></ContactUs></div>
        </div>
    )}
export default Home;