import React from 'react';

const Gallery = () => {
    return (
        <section className=" body-font max-w-[1400px] mx-auto my-24">
            <h3 className='text-center mb-10 font-semibold text-5xl'>Gallery</h3>
  <div className="container px-5 mx-auto flex flex-wrap">
    <div className="flex flex-wrap md:-m-2 -m-1">
      <div className="flex flex-wrap w-1/2">
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://dummyimage.com/500x300" />
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://dummyimage.com/501x301" />
        </div>
        <div className="md:p-2 p-1 w-full">
          <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://dummyimage.com/600x360" />
        </div>
      </div>
      <div className="flex flex-wrap w-1/2">
        <div className="md:p-2 p-1 w-full">
          <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://dummyimage.com/601x361" />
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://dummyimage.com/502x302" />
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://dummyimage.com/503x303" />
        </div>
      </div>
    </div>
  </div>
</section>

    );
};

export default Gallery;