import Lottie from "lottie-react";
import Heading from "../../../Components/Heading/Heading";
import SubHeading from "../../../Components/SubHeading/SubHeading";
import rightIcon from '../../../assets/rightIcon.json'

const HowWeWork = () => {
    return (
            <div className="container mx-auto my-52 flex flex-col items-center gap-16 max-w-6xl px-5 relative" >
              <img loading="lazy" src="https://i.ibb.co/hVgs5kW/Untitled-designsfdfd-1.png" alt="" className="absolute xl:-left-56 -left-10 2xl:-top-36 -top-44 lg:w-64 md:w-52 w-40 opacity-40"/>
                <div className="flex flex-col gap-2">
                    <Heading>How We Works?</Heading>
                    <SubHeading>Embark on Your Journey: The Concord Experience Unveiled.</SubHeading>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-y-10 lg:flex-row lg:gap-x-8 lg:gap-y-0 xl:gap-x-10">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-teal" >
                      <span className="text-base font-bold leading-7 text-white">1</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="mb-2 text-lg font-bold" >
                        Initially, Create your Account
                      </h3>
                      <p className="text-base font-normal leading-7">
                      {`Creating a profile is a prerequisite for users to get the website's different types of functionalities.`}
                      </p>
                    </div>
                  </div>
                  <div className="lg:w-24 w-10"><Lottie animationData={rightIcon}></Lottie></div>                  
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-teal" >
                      <span className="text-base font-bold leading-7 text-white">2</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="mb-2 text-lg font-bold" >
                        Search Your Meaningful Bonds 
                      </h3>
                      <p className="text-base font-normal leading-7">
                      Browse through diverse profiles, and discover potential life partners like your personal preference.
                      </p>
                    </div>
                  </div>
                  <div className="lg:w-24 w-10"><Lottie animationData={rightIcon}></Lottie></div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-teal" >
                      <span className="text-base font-bold leading-7 text-white">3</span>
                    </div>
                    <div className="flex flex-col">
                      <h3
                        className="mb-2 text-lg font-bold"
                      >
                        Begin Your Forever Journey.
                      </h3>
                      <p className="text-base font-normal leading-7">
                      As you find that, pay for the contact information and embark on a journey of shared dreams.
                      </p>
                    </div>
                  </div>
                </div>
            </div>

    )}
export default HowWeWork;





//   <body className="flex min-h-screen flex-col justify-center">
//     <div className="w-full">
      
//     </div>
//   </body>


