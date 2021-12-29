import BannerCard from '@components/common/banner-card';
import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-card';
import ProductCardListSmallLoader from '@components/ui/loaders/product-card-small-list-loader';
import { useOnSellingProductsQuery } from '@framework/product/get-all-on-selling-products';
import { saleBannerWithProducts as banner } from '@framework/static/banner';
import Alert from '@components/ui/alert';
import { ROUTES } from '@utils/routes';

interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  variant?: 'default' | 'reverse';
}

const SaleBannerWithProducts: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  variant = 'default',
  className = 'mb-12 md:mb-14 xl:mb-16',
}) => {
  const { data, isLoading, error } = useOnSellingProductsQuery({
    limit: 10,
  });

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3 md:gap-6 lg:gap-5 xl:gap-7">
          {variant === 'reverse' ? (
            <BannerCard
              banner={banner[1]}
              href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
              effectActive={true}
            />
          ) : (
            <BannerCard
              banner={banner[0]}
              href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
              effectActive={true}
            />
          )}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-5 xl:gap-7 ${
              variant === 'reverse' ? 'row-span-full' : ''
            }`}
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <ProductCardListSmallLoader
                    key={idx}
                    uniqueKey={`on-selling-${idx}`}
                  />
                ))
              : data
                  ?.slice(0, 4)
                  .map((product) => (
                    <ProductCard
                      key={`product--key${product.id}`}
                      product={product}
                      imgWidth={176}
                      imgHeight={176}
                      variant="listSmall"
                    />
                  ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleBannerWithProducts;
