import TestimonialCard from '@components/common/testimonial-card';
import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
import { testimonials } from '@framework/static/testimonials';
import { SwiperSlide } from 'swiper/react';

interface TestimonialsProps {
  sectionHeading: string;
  className?: string;
  type?: 'rounded' | 'circle';
}

const breakpoints = {
  '1720': {
    slidesPerView: 4,
    spaceBetween: 30,
  },
  '1366': {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  '1024': {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  '768': {
    slidesPerView: 1,
    spaceBetween: 30,
  },
  '0': {
    slidesPerView: 1,
    spaceBetween: 30,
  },
};

const TestimonialCarousel: React.FC<TestimonialsProps> = ({
  sectionHeading,
  className = 'mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0 -mx-4 sm:mx-0',
}) => {
  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} className="ml-4 sm:ml-0" />
      <Carousel
        autoplay={false}
        breakpoints={breakpoints}
        className="testimonial-carousel"
        buttonClassName="hidden"
        scrollbar={{ draggable: true, hide: false }}
      >
        {testimonials?.map((testimonial) => (
          <SwiperSlide key={`testimonial--key-${testimonial.id}`}>
            <TestimonialCard item={testimonial} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
