import ContactUs from "../../Shared/ContactUs/ContactUs";
import Faq from "../../Shared/Faq/Faq";
import Banner from "../Banner";

const Home = () => {
    return (
        <div>
             <Banner></Banner>
             <Faq></Faq>
             <div className="mt-24"><ContactUs></ContactUs></div>
        </div>
    )}
export default Home;