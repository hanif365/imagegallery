import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [checkedImages, setCheckedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImages((previousImages) => previousImages.concat(imagesArray));

    event.target.value = "";
  };

  const handleCheckboxChange = (image) => {
    const newCheckedImages = [...checkedImages];
    if (newCheckedImages.includes(image)) {
      newCheckedImages.splice(newCheckedImages.indexOf(image), 1);
    } else {
      newCheckedImages.push(image);
    }
    setCheckedImages(newCheckedImages);
  };

  const deleteSelectedImages = () => {
    const remainingImages = images.filter(
      (image) => !checkedImages.includes(image)
    );
    checkedImages.forEach((image) => URL.revokeObjectURL(image));
    setImages(remainingImages);
    setCheckedImages([]);
  };

  console.log(checkedImages.length);

  return (
    <section className="py-5 rounded-lg">
      <div className="flex justify-between py-2">
        {checkedImages.length > 0 ? (
          <div className="flex">
            <input
              type="checkbox"
              checked={true}
              className="transform scale-150 self-center mr-5"
            />
            <h4 className="text-2xl font-bold self-center">
              {checkedImages.length}{" "}
              {checkedImages.length > 1 ? "files" : "file"} Selected
            </h4>
          </div>
        ) : (
          <h4 className="text-2xl font-bold">Gallery</h4>
        )}
        {checkedImages.length ? (
          <button
            onClick={deleteSelectedImages}
            className="text-lg text-red-500 font-semibold hover:underline"
          >
            Delete {checkedImages.length > 1 ? "files" : "file"}
          </button>
        ) : null}
      </div>
      <hr className="mb-10 border-t-2 w-full" />
      <div className=" grid grid-cols-5 gap-5">
        {images &&
          images.map((image, index) => {
            return (
              <div
                key={image}
                className={`${
                  index === 0 ? "col-span-2 row-span-2" : ""
                } relative group`}
              >
                <input
                  type="checkbox"
                  checked={checkedImages.includes(image)}
                  onChange={() => handleCheckboxChange(image)}
                  className={`absolute top-5 left-5 transform scale-150 cursor-pointer group-hover:opacity-100 ${
                    checkedImages.includes(image) ? "opacity-100" : "opacity-0"
                  } z-10`}
                />
                <img
                  src={image}
                  alt="upload"
                  className={`border shadow-sm rounded-lg w-full h-full m-auto transition-opacity duration-300 ${
                    checkedImages.includes(image) ? "opacity-60" : ""
                  }`}
                />
                <div
                  className={`bg-black rounded-lg absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                    checkedImages.includes(image)
                      ? "opacity-10"
                      : "opacity-0 group-hover:opacity-40"
                  }`}
                ></div>
              </div>
            );
          })}

        <div className="relative cursor-pointer border rounded-lg group bg-gray-100 hover:bg-gray-200 transition-opacity duration-300">
          <label className="cursor-pointer w-auto h-52 flex flex-col items-center justify-center transition-opacity duration-300">
            <FaRegImage className="w-8 h-8 text-gray-500 group-hover:text-black my-5" />
            <span className="text-xl font-bold text-gray-500 group-hover:text-black ">
              Add Images
            </span>
            <input
              type="file"
              name="images"
              onChange={onSelectFile}
              multiple
              className="hidden"
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
