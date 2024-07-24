import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

interface TypeSearch {
  classNames: string;
}
function FormSearch({ classNames }: TypeSearch) {
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <div
        className={`w-9/12 md:w-4/12 lg:w-3/12 flex items-center ml-auto ps-3 pe-3 p-2 gap-3 bg-white rounded-lg md:rounded-xl ${classNames}  ${
          isFocused
            ? "border-green-100 ring-2 ring-green-100 ring-opacity-50 z-10 transition-colors duration-300 ease-in-out shadow-outline "
            : ""
        }`}
      >
        <input
          type="text"
          name="search"
          value={keyword}
          placeholder="Search User..."
          className="w-full focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={() => setKeyword("")}
        />

        <button type="button">
          <IoCloseCircleOutline className="text-green-700" />
        </button>
      </div>
    </>
  );
}

export default FormSearch;
