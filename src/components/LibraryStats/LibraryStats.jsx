import React from "react";
import CountUp from "react-countup";

import availableImg from "../../assets/available.jpg";
import awardImg from "../../assets/award.jpg";
import userImg from "../../assets/user.jpg";
import borrowBookImg from "../../assets/borrowBook.jpg";

const LibraryStats = () => {
    const stats = [
        { img: availableImg, count: 320, label: "Books Available" },
        { img: userImg, count: 110, label: "Registered Members" },
        { img: borrowBookImg, count: 60, label: "Books Borrowed" },
        { img: awardImg, count: 5, label: "Awards" },
    ];

    return (
        <div className="py-5">
            <h2 className="text-3xl py-10 font-bold text-center text-[#008575]">
                Library Stats
            </h2>
            <div className="my-10 px-5">
                <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="relative h-[250px] bg-cover bg-center rounded-lg"
                            style={{ backgroundImage: `url(${stat.img})` }}
                        >
                     
                            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                            
                            <div className="absolute inset-0 flex justify-center items-center text-center text-white">
                                <div>
                                    <h2 className="font-bold text-2xl">
                                        <CountUp end={stat.count} duration={4.5} />+
                                    </h2>
                                    <h3 className="text-xl font-bold">{stat.label}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LibraryStats;
