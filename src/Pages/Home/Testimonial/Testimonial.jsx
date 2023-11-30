import './testimonial.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaQuoteLeft } from 'react-icons/fa';import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import Rating from 'react-rating';
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";

AOS.init();




const Testimonial = () => {

    useEffect(()=>{
        AOS.refresh();
    },[])
    

    return (                                            
        <div className='relative '>
            <div className=' bg-[url(https://i.ibb.co/rGz61wv/2206-w037-n003-436b-p1-436.jpg)] bg-fixed md:h-[70vh] lg:min-h-fit min-h-screen bg-cover bg-no-repeat'></div>
            <div className='absolute w-full h-full bg-black/70 inset-0 backdrop-blur-sm'>
                <div className='flex lg:flex-row flex-col md:mx-10 items-center justify-center m-5'>
                    <div className='lg:w-1/2'>
                        <h1 className='text-6xl font-bold text-white w-fit pl-2 border-l-8 border-light-teal'>Our Success Story</h1>
                    </div>
                    <div className='w-1/2 lg:block hidden' data-aos='slide-left'>
                        <Swiper
                        pagination={{
                        dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className=""
                        >                           
                        <SwiperSlide className="testimonial">
                            <div className='text-white lg:px-10 flex flex-col justify-center items-center'>
                            <FaQuoteLeft className='text-5xl text-light-teal'></FaQuoteLeft>                               
                                <h2 className='mt-7'>Luiz Dias</h2>
                                <p className="text-center mb-5 text-sm" >Automotive Blogger, Velocity Autos. </p>
                                <p className=" md:w-full md:mb-6 w-1/3 mx-auto">
                                {`The platform's commitment to diversity allowed us to appreciate each other's backgrounds, and today, we're happily married. Concord is not just a website; it's the beginning of our beautiful journey."`}
                                </p>
                                <p>Marriage Date: 28th January 2021</p>
                                <Rating
                                initialRating={.5}
                                emptySymbol={<FaStar />}
                                fullSymbol={<FaStarHalf />}
                                className='my-5 text-xl'
                                readonly
                                />
                                <div className="w-28 h-28 mx-auto mb-10"  >
                                    <img src="https://i.ibb.co/hBHdZ5w/christian-buehner-DIt-Ylc26z-VI-unsplash.jpg" alt="" className='rounded-full'/>
                                </div>
                            </div>
                            
                        </SwiperSlide>                           
                        <SwiperSlide className="testimonial">
                            <div className='text-white px-10 md:md-36 flex flex-col justify-center items-center'>
                            <FaQuoteLeft className='text-5xl text-light-teal'></FaQuoteLeft>                               
                                <h2 className='mt-7'>Soun Wing</h2>
                                <p className="text-center mb-5 text-sm" >Footballer,Japan. </p>
                                <p className=" md:w-full md:mb-6 w-1/3 mx-auto">
                                {`Finding love on Concord was a delightful journey. The biodatas provided a comprehensive view of potential partners. We are now happily married, and we credit Concord for helping us navigate the path to our shared happily ever after."`}
                                </p>
                                <p>Marriage Date: 21th August 2023</p>
                                <Rating
                                initialRating={.5}
                                emptySymbol={<FaStar />}
                                fullSymbol={<FaStarHalf />}
                                className='my-5 text-xl'
                                readonly
                                />
                                <div className="w-24 h-24 mx-auto mb-10 rounded-full object-cover"  >
                                    <img src="https://i.ibb.co/ZgD2L3t/redd-f-pz-OUnvx9c1-E-unsplash.jpg" alt="" className='rounded-full'/>
                                </div>
                            </div>
                            
                        </SwiperSlide>                           
                        <SwiperSlide className="testimonial">
                            <div className='text-white px-10 md:md-36 flex flex-col justify-center items-center'>
                            <FaQuoteLeft className='text-5xl text-light-teal'></FaQuoteLeft>                               
                                <h2 className='mt-7'>Abil Qureshee</h2>
                                <p className="text-center mb-5 text-sm" >Softwere Engineer,Toptel Private Limited.</p>
                                <p className=" md:w-full md:mb-6 w-1/3 mx-auto">
                                {`The biodatas allowed us to be specific about our preferences, and the result was a match that felt tailor-made for us. Concord's commitment to user privacy and security gave us the confidence to explore and find each other."`}
                                </p>
                                <p>Marriage Date: 13th March 2020</p>
                                <Rating
                                initialRating={.5}
                                emptySymbol={<FaStar />}
                                fullSymbol={<FaStarHalf />}
                                className='my-5 text-xl'
                                readonly
                                />
                                <div className="w-28 h-28 mx-auto mb-10"  >
                                    <img src="https://i.ibb.co/xfLVTwQ/mitchell-luo-CMng5-Bz-Pv1o-unsplash.jpg" alt="" className='rounded-full'/>
                                </div>
                            </div>
                            
                        </SwiperSlide>                           
                        <SwiperSlide className="testimonial">
                            <div className='text-white px-10 md:md-36 flex flex-col justify-center items-center'>
                            <FaQuoteLeft className='text-5xl text-light-teal'></FaQuoteLeft>                               
                                <h2 className='mt-7'>John Mitchell</h2>
                                <p className="text-center mb-5 text-sm" >Automotive Engineer,AutoGenius Limited.</p>
                                <p className=" md:w-full md:mb-6 w-1/3 mx-auto">
                                {`Concord has truly been the bridge to our forever. We connected through biodatas, and from that first conversation to our magical wedding day, every step felt guided by the genuine connections fostered on this incredible platform."`}
                                </p>
                                <p>Marriage Date: 3rd December 2020</p>
                                <Rating
                                initialRating={.5}
                                emptySymbol={<FaStar />}
                                fullSymbol={<FaStarHalf />}
                                className='my-5 text-xl'
                                readonly
                                />
                                <div className="w-24 h-24 mx-auto mb-10"  >
                                    <img src="https://i.ibb.co/b2c6J9M/wepik-export-20231013215817-C2-TE.jpg" alt="" className='rounded-full'/>
                                </div>
                            </div>
                            
                        </SwiperSlide>                           
                        </Swiper>
                    </div>
                    <div className='lg:hidden'>
                        <div className='text-white px-1 flex flex-col justify-center items-center'>
                                <FaQuoteLeft className='text-5xl text-light-teal mt-5'></FaQuoteLeft>                               
                                    <h2 className='mt-7'>Luiz Dias</h2>
                                    <p className="text-center mb-5 text-xs" >Automotive Blogger, Velocity Autos. </p>
                                    <p className=" mx-auto text-xs">
                                    {`The platform's commitment to diversity allowed us to appreciate each other's backgrounds, and today, we're happily married. Concord is not just a website; it's the beginning of our beautiful journey."`}
                                    </p>
                                    <p>Marriage Date: 28th January 2021</p>
                                    <Rating
                                    initialRating={.5}
                                    emptySymbol={<FaStar />}
                                    fullSymbol={<FaStarHalf />}
                                    className='my-5 text-xl'
                                    readonly
                                    />
                                    <div className="w-28 h-28 mx-auto mb-10"  >
                                        <img src="https://i.ibb.co/hBHdZ5w/christian-buehner-DIt-Ylc26z-VI-unsplash.jpg" alt="" className='rounded-full'/>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;



/**
 * 
 *                  <div className="relative max-w-md mx-auto flex flex-col py-6 px-8 bg-white rounded-lg shadow-lg">
                        <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRreh9Fwfj6mP6s9CINDCpfUXmi6OrRXJoD8fFI7BV01mzbbC1FhW5MLGQZYgH9PJ8UhC0&usqp=CAU"
                        alt=""
                        className="absolute rounded-full w-14 h-14 -left-6 -top-6"
                        />
                        <p className="text-[#5E6282]">
                            “On the Windows talking painted pasture yet its express parties
                            use. Sure last upon he same as knew next. Of believed or
                            diverted no.”
                        </p>
                        <p className="mt-6 mb-2">Mike taylor</p>
                        <p className="text-sm">USA, CA</p>
                    </div>
 * 

                    <div className="title text-5xl w-28 h-28 mx-auto"  data-swiper-parallax="-300">
                        <img src="https://i.ibb.co/xfLVTwQ/mitchell-luo-CMng5-Bz-Pv1o-unsplash.jpg" alt="" className='rounded-full'/>
                    </div>
                    <div className="text-center my-2" data-swiper-parallax="-200">
                        Abil Qureshee
                    </div>
                    <div className="text-center mb-5" data-swiper-parallax="-200">
                        Softwere Engineer,Toptel Private Limited.
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                        {`"I had the pleasure of test driving one of [Your Company's] cars, and I was truly impressed. The vehicle's performance and handling were exceptional. It's clear that [Your Company] is dedicated to delivering high-quality cars."`}
                        </p>
                    </div>

 */