import { lazy, Suspense } from "react";
import Banner from "../Banner";
import Loader from "../../../Components/Loader/Loader";
import FeaturedCards from "../FeaturedCards/FeaturedCards";

const HowWeWork = lazy(() => import("../HowWeWork/HowWeWork"));
const SuccessCounter = lazy(() => import("../SuccessCounter/SuccessCounter"));
const Testimonial = lazy(() => import("../Testimonial/Testimonial"));
const ContactUs = lazy(() => import("../../Shared/ContactUs/ContactUs"));
const Faq = lazy(() => import("../../Shared/Faq/Faq"));

const Home = () => {
    return (
        <>
            <Banner />
            <FeaturedCards />
            <Suspense fallback={<Loader />}>
                <HowWeWork />
                <SuccessCounter />
                <Testimonial />
                <Faq />
                <ContactUs />
            </Suspense>
        </>
    )}
export default Home;