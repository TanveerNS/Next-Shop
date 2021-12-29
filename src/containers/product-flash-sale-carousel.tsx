import Carousel from '@components/ui/carousel/carousel';
import ProductCard from '@components/product/product-card';
import SectionHeader from '@components/common/section-header';
import ProductCardGridLoader from '@components/ui/loaders/product-card-grid-loader';
import { useFlashSaleProductsQuery } from '@framework/product/get-all-flash-sale-products';
import Alert from '@components/ui/alert';
import { SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
const Countdown = dynamic(() => import('react-countdown'), { ssr: false });

interface ProductsProps {
  sectionHeading?: string;
  className?: string;
  date?: any;
}

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return <span>Time Over!</span>;
  } else {
    // Render a countdown
    return (
      <div className="flex items-center space-s-1.5 md:space-s-2.5">
        <div className="text-heading text-10px md:text-xs text-center uppercase">
          <span className="bg-heading rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1">
            {days}
          </span>
          days
        </div>
        <div className="text-heading text-10px md:text-xs text-center uppercase">
          <span className="bg-heading rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1">
            {hours}
          </span>
          hours
        </div>
        <div className="text-heading text-10px md:text-xs text-center uppercase">
          <span className="bg-heading rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1">
            {minutes}
          </span>
          mins
        </div>
        <div className="text-heading text-10px md:text-xs text-center uppercase">
          <span className="bg-heading rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1">
            {seconds}
          </span>
          secs
        </div>
      </div>
    );
  }
};

const breakpoints = {
  '1720': {
    slidesPerView: 5,
    spaceBetween: 30,
  },
  '1400': {
    slidesPerView: 5,
    spaceBetween: 30,
  },
  '1025': {
    slidesPerView: 5,
    spaceBetween: 30,
  },
  '768': {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  '500 ': {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  '0': {
    slidesPerView: 3,
    spaceBetween: 12,
  },
};

const ProductsFlashSaleCarousel: React.FC<ProductsProps> = ({
  sectionHeading = 'text-flash-sale',
  className = 'mb-12 md:mb-14 xl:mb-16',
  date,
}) => {
  const { data, isLoading, error } = useFlashSaleProductsQuery({
    limit: 10,
  });
  return (
    <div className={`${className} pt-5 md:pt-6 lg:pt-7 pb-5 lg:pb-7s  `}>
      <div className="flex justify-between items-center flex-wrap mb-5 md:mb-6">
        <SectionHeader sectionHeading={sectionHeading} className="mb-0" />
        {date && (
          <Countdown date={date} intervalDelay={1000} renderer={renderer} />
        )}
      </div>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <Carousel
          autoplay={false}
          breakpoints={breakpoints}
          buttonClassName="-mt-2 sm:-mt-[5.5rem] md:-mt-28"
        >
          {isLoading && data?.productFlashSellGridTwo?.length
            ? Array.from({ length: 10 }).map((_, idx) => (
                <ProductCardGridLoader
                  key={idx}
                  uniqueKey={`flash-sale-${idx}`}
                />
              ))
            : data?.productFlashSellGridTwo?.map((product: any) => (
                <SwiperSlide key={`product--key-${product.id}`}>
                  <ProductCard
                    product={product}
                    imgWidth={324}
                    imgHeight={324}
                    variant="gridSlim"
                  />
                </SwiperSlide>
              ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductsFlashSaleCarousel;
