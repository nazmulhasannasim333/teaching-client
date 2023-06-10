import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const Gallery = () => {
    return (
        <section className=" body-font max-w-[1400px] mx-auto my-24">
            <h3 className='text-center mb-10 font-semibold text-5xl'>Gallery</h3>
  <div className="container px-5 mx-auto flex flex-wrap">
    <div className="flex flex-wrap md:-m-2 -m-1">
      <div className="flex flex-wrap w-1/2">
        <div className="md:p-2 p-1 w-1/2">
          <Zoom>
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </Zoom>
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <Zoom>
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.pexels.com/photos/8197534/pexels-photo-8197534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </Zoom>
        </div>
        <div className="md:p-2 p-1 w-full">
          <Zoom>
          <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </Zoom>
        </div>
      </div>
      <div className="flex flex-wrap w-1/2">
        <div className="md:p-2 p-1 w-full">
         <Zoom>
         <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://images.pexels.com/photos/7092339/pexels-photo-7092339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
         </Zoom>
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <Zoom>
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.pexels.com/photos/7092371/pexels-photo-7092371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </Zoom>
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <Zoom>
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.pexels.com/photos/6503155/pexels-photo-6503155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </Zoom>
        </div>
      </div>
    </div>
  </div>
</section>

    );
};

export default Gallery;