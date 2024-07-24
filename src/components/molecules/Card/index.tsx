function Card() {
  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="p-8 rounded-t-lg"
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
            {/* <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
