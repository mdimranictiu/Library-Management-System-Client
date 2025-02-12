import React from "react";
import thrillerImg from "../../assets/thriller.jpg";
import fictionImg from "../../assets/fiction.jpg";
import historyImg from "../../assets/history.jpg";
import novelImg from "../../assets/novel.jpg";
import dramaImg from "../../assets/drama.jpg";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="my-5 px-5">
      <h2 className="text-3xl py-5 font-bold text-center text-[#008575]">
        Book Categories
      </h2>
      <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1 py-10">
        {/* Category 1 */}
        <div className="relative group">
          <img
            src={novelImg}
            alt="Novel"
            className="w-full h-[250px] object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[#39393980] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <div className="text-center">
              <h2 className="text-2xl text-white">Novel</h2>
             <Link to='/category' state={'Novel'} ><button className="mt-3 text-xl px-4 py-2 bg-[#008575] text-white rounded-lg">
                View All
              </button></Link>
            </div>
          </div>
        </div>

        {/* Category 2 */}
        <div className="relative group">
          <img
            src={fictionImg}
            alt="Fiction"
            className="w-full h-[250px] object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[#39393980] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <div className="text-center">
              <h2 className="text-2xl text-white">Fiction</h2>
              <Link to='/category' state={'Fiction'} ><button className="mt-3 text-xl px-4 py-2 bg-[#008575] text-white rounded-lg">
                View All
              </button></Link>
            </div>
          </div>
        </div>

        {/* Category 3 */}
        

        {/* Category 4 */}
        <div className="relative group">
          <img
            src={historyImg}
            alt="History"
            className="w-full h-[250px] object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[#39393980] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <div className="text-center">
              <h2 className="text-2xl text-white">History</h2>
              <Link to='/category' state={'History'} ><button className="mt-3 text-xl px-4 py-2 bg-[#008575] text-white rounded-lg">
                View All
              </button></Link>
            </div>
          </div>
        </div>
        {/* category 5 */}
        <div className="relative group">
          <img
            src={dramaImg}
            alt="Drama"
            className="w-full h-[250px] object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[#39393980] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <div className="text-center">
              <h2 className="text-2xl text-white">Drama</h2>
              <Link to='/category' state={'Drama'} ><button className="mt-3 text-xl px-4 py-2 bg-[#008575] text-white rounded-lg">
                View All
              </button></Link>
            </div>
          </div>
        </div>
        <div className="relative group">
          <img
            src={thrillerImg}
            alt="Thriller Img"
            className="w-full h-[250px] object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[#39393980] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <div className="text-center">
              <h2 className="text-2xl text-white">Thriller</h2>
              <Link to='/category' state={'Thriller'} ><button className="mt-3 text-xl px-4 py-2 bg-[#008575] text-white rounded-lg">
                View All
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
