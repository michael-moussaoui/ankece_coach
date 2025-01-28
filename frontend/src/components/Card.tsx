
interface CardProps {
  image: string;
  Button?: string;
  CardDescription: string;
  CardTitle: string;
  titleHref?: string;
  btnHref?: string;
}

const Card: React.FC<CardProps> = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <div className="mb-10 overflow-hidden rounded-lg bg-white  shadow-1 duration-300  dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
      <img src={image} alt="" className="h-1/2 w-full rounded-t-md shadow-md " />
      <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
        <h3>
          <a
            href={titleHref || "/#"}
            className="mb-3 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
          >
            {CardTitle}
          </a>
        </h3>
        <p className="mb-3 text-base leading-relaxed text-body-color dark:text-dark-6">
          {CardDescription}
        </p>
        {Button && (
          <a
            href={btnHref || "#"}
            className="inline-block rounded-md border border-gray-3 px-7 py-2 text-base bg-custom-gradient text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
          >
            {Button}
          </a>
        )}
      </div>
    </div>
  );
};

export default Card