import { lazy, Suspense } from "react";
import Banner from "../Banner";
import FeaturedCards from "../FeaturedCards/FeaturedCards";
import HowWeWork from "../HowWeWork/HowWeWork";
import SuccessCounter from "../SuccessCounter/SuccessCounter";
import Testimonial from "../Testimonial/Testimonial";

const ContactUs = lazy(() => import("../../Shared/ContactUs/ContactUs"));
const Faq = lazy(() => import("../../Shared/Faq/Faq"));

const Home = () => {
    return (
        <div>
             <Banner></Banner>
             <FeaturedCards></FeaturedCards>
             <Suspense>
             <HowWeWork></HowWeWork>
             <SuccessCounter></SuccessCounter>
             <Testimonial></Testimonial>
                 <Faq></Faq>
                 <div className="mt-24"><ContactUs></ContactUs></div>
             </Suspense>
        </div>
    )}
export default Home;