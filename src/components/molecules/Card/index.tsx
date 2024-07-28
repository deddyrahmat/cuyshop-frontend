function Card() {
  return (
    <>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/product/2">
          <img
            className="p-8 rounded-t-lg mx-auto"
            src="./dummy/black.png"
            alt="product image"
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="line-clamp-2 text-md md:text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              ducimus fuga error exercitationem voluptas asperiores. Ut et
              dolore commodi possimus. Non eius repellendus odit, eum
              praesentium ad! Fuga, aperiam molestiae.
            </h5>
          </a>
          <div className="flex items-center justify-between">
            <span className="text:sm lg:text-lg font-bold text-gray-500 dark:text-white">
              $599
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
