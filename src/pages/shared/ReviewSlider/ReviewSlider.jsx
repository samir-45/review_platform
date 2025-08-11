import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import reviewTop from '../../../assets/customer-top.png'

const reviews =
    [
        {
            "id": 1,
            "name": "Ayesha Rahman",
            "profession": "Fashion Blogger",
            "avatar": "https://i.pravatar.cc/150?img=47",
            "review": "I ordered a summer dress from TrendyCloset and it arrived exactly as pictured. Quality exceeded my expectations and the delivery was super quick!"
        },
        {
            "id": 2,
            "name": "Raihan Kabir",
            "profession": "E-commerce Entrepreneur",
            "avatar": "https://i.pravatar.cc/150?img=33",
            "review": "Bought a smartwatch from GadgetWorld and the experience was flawless. Smooth checkout, fast delivery, and authentic product."
        },
        {
            "id": 3,
            "name": "Maliha Chowdhury",
            "profession": "Graphic Designer",
            "avatar": "https://i.pravatar.cc/150?img=25",
            "review": "Purchased some art supplies from CreativeMart and the packaging was so thoughtful. Colors were vibrant and exactly what I needed for my projects."
        },
        {
            "id": 4,
            "name": "Tanvir Hasan",
            "profession": "Freelance Photographer",
            "avatar": "https://i.pravatar.cc/150?img=12",
            "review": "Ordered a camera lens from SnapStore. The product was genuine and they even included a free cleaning kit. Highly recommended!"
        },
        {
            "id": 5,
            "name": "Sumaiya Islam",
            "profession": "Makeup Artist",
            "avatar": "https://i.pravatar.cc/150?img=64",
            "review": "Shopped for skincare products at GlowHub. Everything was authentic and fresh, plus they gave me some free samples!"
        },
        {
            "id": 6,
            "name": "Arif Mahmood",
            "profession": "Tech Reviewer",
            "avatar": "https://i.pravatar.cc/150?img=29",
            "review": "Bought a gaming mouse from ProGamerStore. Excellent build quality, smooth sensor, and delivered within 2 days."
        },
        {
            "id": 7,
            "name": "Nusrat Jahan",
            "profession": "Bookstore Owner",
            "avatar": "https://i.pravatar.cc/150?img=50",
            "review": "Purchased several novels from ReadMore Online. Books arrived in perfect condition and earlier than expected."
        },
        {
            "id": 8,
            "name": "Samiul Haque",
            "profession": "Gadget Seller",
            "avatar": "https://i.pravatar.cc/150?img=17",
            "review": "Ordered wireless earbuds from SoundWave. The product was exactly as described and sound quality is amazing."
        },
        {
            "id": 9,
            "name": "Lubna Sultana",
            "profession": "Home Decor Specialist",
            "avatar": "https://i.pravatar.cc/150?img=38",
            "review": "Bought decorative lamps from CozyHome. The craftsmanship is beautiful and the warm lighting changes the whole vibe of my living room."
        },
        {
            "id": 10,
            "name": "Mehedi Hasan",
            "profession": "Restaurant Owner",
            "avatar": "https://i.pravatar.cc/150?img=15",
            "review": "Ordered kitchen appliances from Chef's Choice. Everything works perfectly and customer support was very helpful in tracking my shipment."
        }
    ]



const ReviewSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (
            swiperRef.current &&
            swiperRef.current.params &&
            swiperRef.current.params.navigation
        ) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <section className="py-20 w-11/12 sm:w-full mx-auto relative z-50">
            <div className='flex flex-col items-center justify-center  z-50 gap-5'>
                <h1 className='text-4xl font-bold text-center'>What our users are sayings</h1>
                <p className='text-center'>Enhance convenience and mobility, easy to use, get effortlessly honest reviews.</p>
            </div>

            <div className="relative max-w-7xl mx-auto">
                <Swiper
                    modules={[Navigation]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    loop={true}
                    centeredSlides={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}

                    spaceBetween={0}
                    grabCursor={true}
                    className="pb-14"
                >
                    {reviews.map((review, index) => {
                        const total = reviews.length;
                        const realIndex = (index - activeIndex + total) % total;

                        let cardStyle = "scale-90 opacity-40 translate-y-4";

                        if (realIndex === 0) {
                            cardStyle = "scale-100 opacity-100 translate-y-0";
                        } else if (realIndex === 1 || realIndex === total - 1) {
                            cardStyle = "scale-85 opacity-20 translate-y-2";
                        } else if (realIndex === 2 || realIndex === total - 2) {
                            cardStyle = "scale-75 opacity-15 translate-y-4";
                        }


                        return (
                            <SwiperSlide className='py-10' key={review.id}>
                                <div
                                    className={`transition-all duration-500 ${cardStyle} bg-base-200 p-6 min-w-64 h-72 rounded-xl shadow-xl`}
                                >
                                    <FaQuoteLeft className="text-3xl text-primary mb-4" />
                                    <p className="text-base-content/70 text-sm mb-6">{review.review}</p>
                                    {/* Dashed line */}
                                    <div className='flex justify-center items-center'>
                                        <div className="hidden md:block bg-dotted h-2 w-full border-b-[1.5px] border-dashed border-gray-500"></div>
                                    </div>

                                    <div className="flex gap-5 my-5 items-center">
                                        <div>
                                            <img
                                                src={review.avatar}
                                                alt={review.name}
                                                className="w-14 h-14 rounded-full object-cover"
                                            />
                                        </div>

                                        <div>
                                            <h4 className="text-base-content font-semibold">{review.name}</h4>
                                            <p className="text-xs text-base-content/50">{review.profession}</p>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                {/* Working Navigation Arrows */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        ref={prevRef}
                        className="btn btn-circle bg-base-200 shadow text-primary hover:bg-primary hover:text-white transition-all"
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        ref={nextRef}
                        className="btn btn-circle bg-base-200 shadow text-primary hover:bg-primary hover:text-white transition-all"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ReviewSlider;
