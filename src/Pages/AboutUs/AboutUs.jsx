import Heading from "../../Components/Heading/Heading";

const AboutUs = () => {
    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 mb-52 mt-10">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <Heading>About Us</Heading>
                    <p className="font-normal text-black/70 mt-8">Welcome to Concord, the heartwarming chapter where the symphony of love orchestrates lifelong unions. Our story begins with the simple belief that every heart deserves a counterpart, and every soul deserves a companion for lifes extraordinary journey.In the vibrant tapestry of matrimony, Concord stands as a testament to the power of connection and the beauty that unfolds when two souls find harmony. Founded with passion and purpose, Concord is more than a matrimony platform; its a sanctuary for individuals seeking the profound joy of a shared life.</p>
                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <Heading>Our Story</Heading>
                    <p className="font-normal text-black/70 mt-8">Our promise is one of inclusivity and respect. Concord embraces the kaleidoscope of races, backgrounds, and traditions, fostering an environment where every individual feels embraced and celebrated. In the dance of diversity, we find the strength to build connections that transcend boundaries.Security and privacy form the pillars of our commitment to you.</p>
                </div>
                <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden rounded-xl" src="https://i.ibb.co/fx2B9sR/mitchell-luo-CMng5-Bz-Pv1o-unsplas.jpg" alt="Alexa featured Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Richard</p>
                            <small>CEO</small>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden rounded-xl" src="https://i.ibb.co/j5R8MGL/IMG-5522-02-jpeg.jpg" alt="Olivia featured Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Isaac</p>
                            <small>Coordinator</small>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden rounded-xl" src="https://i.ibb.co/hBHdZ5w/christian-buehner-DIt-Ylc26z-VI-unsplash.jpg" alt="Liam featued Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Liam</p>
                            <small>CTO</small>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden rounded-xl" src="https://i.ibb.co/x8MzXdr/redd-f-pz-OUnvx9c1-E-unsplash-1.jpg" alt="Elijah featured img" />
                            <img className="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Tomlinson</p>
                            <small>Chief Marketing Officer</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
