import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div>
            <div className=" w-full relative">
                {/* Radial Gradient Background from Bottom */}
                {/* <div
                    className="absolute inset-0 -top-7 z-0"
                    style={{
                        background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
                    }}
                /> */}
                {/* Your Content/Components */}

                <section className="relative z-10 py-20 flex space-y-3 flex-col items-center text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.05 }}
                        className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white shadow border border-slate-200 text-sm mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        500+ Active Reviewers
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl"
                    >
                     Read & Share Your <span className="text-indigo-500">Honest Reviews</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="mt-4 text-slate-600 max-w-2xl"
                    >
                        Discover real experiences from our community and add your own to help others shop smarter.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 flex flex-wrap gap-4 justify-center"
                    >
                        <Link
                            to="/get-started"
                            className="px-6 py-3 rounded-xl bg-indigo-500 text-white shadow hover:shadow-md transition"
                        >
                            ✍️ Write a Review
                        </Link>
                        <Link
                            to="/learn-more"
                            className="px-6 py-3 rounded-xl bg-white border border-slate-200 shadow hover:shadow-md transition"
                        >
                            Browse Reviews
                        </Link>
                    </motion.div>
                </section>

            </div>
        </div>
    );
};

export default Banner;