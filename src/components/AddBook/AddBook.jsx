import React from 'react';

const AddBook = () => {
    return (
        <div className='py-10'>
            <h2 className='text-3xl py-10 text-center font-bold text-[#008575]'>Add Book</h2>
            <div className='w-4/5 p-5 max-sm:w-full mx-auto py-10'>
            <form className=" max-sm:w-full max-md:w-full  border border-gray-300 mx-auto">
        <div className="grid p-10  grid-cols-2  gap-5 max-md:grid-cols-1 max-md:w-full max-sm:w-full max-sm:grid-cols-1 mx-auto">
          
     
        <div className="form-control ">
            <label className="label">
              <span className="label-text text-[18px] text-[#008575]">Fee</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Fee"
                name="Fee"
                className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text text-[18px] text-[#008575]">Fee</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Fee"
                name="Fee"
                className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text text-[18px] text-[#008575]">Fee</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Fee"
                name="Fee"
                className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text text-[18px] text-[#008575]">Fee</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Fee"
                name="Fee"
                className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text text-[18px] text-[#008575]">Fee</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Fee"
                name="Fee"
                className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text text-[18px] text-[#008575]">Fee</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Fee"
                name="Fee"
                className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text text-[18px] text-[#008575]">Fee</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Fee"
                name="Fee"
                className="input focus:ring-1 focus:outline-none focus:ring-[#008575]  max-md:w-full text-[18px] input-bordered w-4/5 mx-auto max-sm:w-full"
              />
            </label>
          </div>
        </div>
        <div className="form-control my-16 ">
          <label className="input-group">
            <input
              type="submit"
              value="Add Book"
              className="input input-bordered font-semi-bold text-[22px] w-2/5 max-sm:w-full max-sm:mx-auto ml-[30%] text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]"
            />
          </label>
        </div>
      </form>

            </div>
        
        </div>
    );
};

export default AddBook;