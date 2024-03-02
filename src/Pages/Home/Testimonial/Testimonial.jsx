import './testimonial.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaQuoteLeft } from 'react-icons/fa';import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hook/useAxiosPublic'

const Testimonial = () => {

    const axiosSecure = useAxiosPublic();
    const {data = []} = useQuery({
        queryKey:['success-stories'],
        queryFn:()=>axiosSecure.get('/success-stories')
    })
    console.log(data?.data);

    return (                                            
        <div className='relative '>
            <div className=' bg-[url(https://i.ibb.co/rGz61wv/2206-w037-n003-436b-p1-436.jpg)] bg-fixed 2xl:h-[430px] lg:h-[450px] h-[100vh] bg-cover bg-no-repeat'></div>
            <div className='absolute w-full h-full bg-black/70 inset-0 backdrop-blur-sm '>
                <div className='flex lg:flex-row flex-col mx-3 gap-10 lg:gap-0 2xl:mx-10 items-center justify-center'>
                    <div className='lg:w-1/2' data-aos='fade-right'>
                        <h1 className='2xl:text-6xl text-5xl font-bold text-white w-fit pl-2 border-l-8 border-light-teal mt-6 lg:mt-0'>Our Success Story</h1>
                    </div>
                    {/*   */}
                    <div className='lg:w-1/2 w-full' data-aos='fade-left'>
                        <Swiper
                        pagination={{
                        dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className=""
                        >
                        {
                            data?.data?.map(testimonial=><SwiperSlide key={testimonial._id} className="testimonial">
                            <div className='text-white 2xl:px-10 flex flex-col justify-center items-center md:mt-5 mt-0'>
                            <FaQuoteLeft className='md:text-5xl text-4xl text-light-teal'></FaQuoteLeft>                               
                                <h2 className='mt-5 text-lg'>{testimonial.UserName}</h2>
                                <p className="text-center mb-5 text-sm" >{testimonial?.Location}</p>
                                <p className="w-full mb-6 mx-auto md:text-base text-sm text-white/80">
                                {testimonial.Review}
                                </p>
                                <p>Marriage Date: {testimonial.MarriageDate}</p>
                                <div className="mx-auto my-7"  >
                                    <img loading="lazy" src={testimonial.UserImage} alt="" className='rounded-full md:w-24 w-16 md:h-24 h-16'/>
                                </div>
                            </div>
                            
                        </SwiperSlide> )
                        }                      
                         
                        </Swiper>
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
                        <img src="https://i.ibb.co/xfLVTwQ/mitchell-luo-CMng5-Bz-Pv1o-unsplash.jpg" alt="" className='rounded-full w-24 h-24'/>
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