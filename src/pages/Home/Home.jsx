import React from 'react';
import Banner from '../shared/Banner';
import ReviewSection from '../shared/ReviewSection/ReviewSection';
import ReviewSlider from '../shared/ReviewSlider/ReviewSlider';

const Home = () => {
    return (
        <div>
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
                }}
            />
            <div>
                <Banner></Banner>
            </div>
            <div>
                <ReviewSection></ReviewSection>
            </div>
            <div>
                <ReviewSlider></ReviewSlider>
            </div>
        </div>
    );
};

export default Home;