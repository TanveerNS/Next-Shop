import IconCard from '@components/common/icon-card';
import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
import CardIconLoader from '@components/ui/loaders/card-icon-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { ROUTES } from '@utils/routes';
import Alert from '@components/ui/alert';
import { SwiperSlide } from 'swiper/react';

interface CategoriesProps {
  sectionHeading: string;
  className?: string;
}

const breakpoints = {
  '1720': {
    slidesPerView: 7,
    spaceBetween: 20,
  },
  '1400': {
    slidesPerView: 7,
    spaceBetween: 28,
  },
  '1025': {
    slidesPerView: 6,
    spaceBetween: 28,
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

const CategoryBlockIcon: React.FC<CategoriesProps> = ({
  className = 'mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0',
  sectionHeading,
}) => {
  const { data, isLoading, error } = useCategoriesQuery({
    limit: 10,
  });

  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <Carousel
          autoplay={false}
          breakpoints={breakpoints}
          buttonClassName="-mt-2 md:-mt-2"
        >
          {isLoading && !data
            ? Array.from({ length: 10 }).map((_, idx) => {
                return (
                  <SwiperSlide key={`card-rounded-${idx}`}>
                    <CardIconLoader uniqueKey={`card-rounded-${idx}`} />
                  </SwiperSlide>
                );
              })
            : data?.categories?.data?.map((category) => (
                <SwiperSlide key={`category--key-${category.id}`}>
                  <IconCard
                    item={category}
                    href={`${ROUTES.CATEGORY}/${category.slug}`}
                    effectActive={true}
                  />
                </SwiperSlide>
              ))}
        </Carousel>
      )}
    </div>
  );
};

export default CategoryBlockIcon;
