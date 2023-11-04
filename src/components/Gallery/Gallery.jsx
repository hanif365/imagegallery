import React, { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import firebaseService from "../../firebase/firebaseService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [checkedImages, setCheckedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageOrder, setImageOrder] = useState([]);
  const [showShadow, setShowShadow] = useState(true);


  // show notification using toast
  const showToast = (message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Add Images to firestore functionality
  const handleAddImages = async (event) => {
    setLoading(true);
    setCheckedImages([]);
    const addImages = event.target.files;
    const res = await firebaseService.imageUpload(addImages);
    setLoading(false);

    if (res.success) {
      showToast(res.success, "success");

      // After add images call "handleGetImages" function to get updated data
      handleGetImages();
    } else if (res.error) {
      showToast(res.error, "error");
    }
  };

  // Get images from firestore
  const handleGetImages = async () => {
    // setLoading(true);
    const res = await firebaseService.getImages();
    setImages(res);
    setImageOrder(res.map((_, index) => `${index}`));
    // setLoading(false);
  };

  useEffect(() => {
    // Fetch the initial set of images when the component mounts
    handleGetImages();
  }, []);

  // used for show skeleton loader
  setTimeout(() => {
    setShowShadow(false);
  }, 5000);


  const handleCheckboxChange = (image) => {
    // Create a new array to hold the checked images
    const newCheckedImages = [...checkedImages];

    // If the image is already in the list of checked images, remove it
    if (newCheckedImages.includes(image)) {
      newCheckedImages.splice(newCheckedImages.indexOf(image), 1);
    }

    // If the image is not in the list, add it
    else {
      newCheckedImages.push(image);
    }

    // Update the state with the new list of checked images
    setCheckedImages(newCheckedImages);
  };

  const deleteSelectedImages = async () => {
    setLoading(true);

    // Call the Firebase service to delete the selected images
    const res = await firebaseService.deleteImage(checkedImages);
    setLoading(false);

    if (res.success) {
      showToast(res.success, "success");

      // After a successful deletion, call "handleGetImages" function to get updated data
      handleGetImages();

      // Clear the list of checked images since they are now deleted
      setCheckedImages([]);
    } else if (res.error) {
      showToast(res.error, "error");
    }
  };

  const onDragEnd = (result) => {
    // Check if there is no valid destination or if the source and destination are the same
    if (
      !result.destination ||
      result.droppableId === result.destination.droppableId
    ) {
      return;
    }

    // Create a new array to represent the updated image order
    const newImageOrder = Array.from(imageOrder);

    // Remove the dragged image from its original position
    const [removed] = newImageOrder.splice(result.source.index, 1);

    // Insert the dragged image at its new position
    newImageOrder.splice(result.destination.index, 0, removed);

    // Update the state with the new image order to reflect the reordering
    setImageOrder(newImageOrder);
  };

  return (
    <section className="py-5 rounded-lg">
      <div className="flex justify-between mx-2 py-2 relative">
        {loading ? (
          <div className="animate-pulse">
            <BarLoader
              color="#79BCF7"
              loading={loading}
              width={250}
              height={20}
              className="rounded"
            />
          </div>
        ) : checkedImages.length > 0 ? (
          <div className="flex">
            <input
              type="checkbox"
              checked={true}
              className="transform scale-150 self-center mr-5"
            />
            <h4 className="text-sm lg:text-2xl font-bold self-center">
              {checkedImages.length}
              {checkedImages.length > 1 ? "files" : "file"} Selected
            </h4>
          </div>
        ) : (
          <h4 className="text-sm lg:text-2xl font-bold">Gallery</h4>
        )}
        {checkedImages.length ? (
          <button
            onClick={deleteSelectedImages}
            className={`text-sm lg:text-lg text-red-500 font-semibold hover:underline cursor-pointer ${
              loading ? "hidden" : ""
            }`}
          >
            Delete {checkedImages.length > 1 ? "files" : "file"}
          </button>
        ) : null}

        <div className="absolute">
          <ToastContainer />
        </div>
      </div>
      <hr className="mb-10 border-t-2 w-full" />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-grid" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-5 gap-5"
            >
              {imageOrder.map((imageIndex, index) => {
                const image = images[imageIndex];
                console.log(imageIndex, image);
                return (
                  <Draggable
                    key={imageIndex}
                    draggableId={imageIndex}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${
                          index === 0 ? "col-span-2 row-span-2" : ""
                        } relative group ${loading ? "animate-pulse" : ""}`}
                      >
                        {!showShadow && images.length > 0 ? (
                          <>
                            <input
                              type="checkbox"
                              disabled={loading}
                              checked={checkedImages.includes(image)}
                              onChange={() => handleCheckboxChange(image)}
                              className={`absolute top-1 left-1 lg:top-5 lg:left-5 transform scale-50 lg:scale-150 cursor-pointer group-hover:opacity-100 ${
                                checkedImages.includes(image)
                                  ? "opacity-100"
                                  : "opacity-0"
                              } z-10`}
                            />
                            <img
                              src={image.src}
                              alt="image"
                              draggable={false}
                              className={`border shadow-sm rounded-lg w-full h-full m-auto transition-opacity duration-300 ${
                                checkedImages.includes(image)
                                  ? "opacity-60"
                                  : ""
                              }`}
                            />
                            <div
                              className={`bg-black rounded-lg absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                                checkedImages.includes(image)
                                  ? "opacity-10"
                                  : "opacity-0 group-hover:opacity-40"
                              }`}
                            ></div>
                          </>
                        ) : (
                          // show skeleton loading
                          <div className="w-full h-full rounded-lg">
                            <div className="animate-pulse">
                              <div className="shadow rounded-md  w-full mx-auto">
                                <div className="flex space-x-4">
                                  <div className="flex-1">
                                    <div
                                      className={`${
                                        index === 0
                                          ? "h-32 lg:h-[27rem]"
                                          : "h-14 lg:h-52"
                                      } bg-slate-100 rounded`}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}

              {!showShadow && images.length > 0 ? (
                <div className="relative cursor-pointer border-dashed border-2 border-gray-300 rounded-lg group bg-gray-100 hover:bg-gray-200 transition-opacity duration-300">
                  <label className="cursor-pointer w-auto lg:h-52 flex flex-col items-center justify-center transition-opacity duration-300">
                    <FaRegImage className="lg:w-8 lg:h-8 mt-4 lg:mt-0 text-gray-500 group-hover:text-black my-2 lg:my-5" />
                    <span className="text-sm lg:text-xl hidden lg:block font-bold text-gray-500 group-hover:text-black ">
                      Add Images
                    </span>
                    <input
                      type="file"
                      name="images"
                      onChange={handleAddImages}
                      multiple
                      required
                      className="hidden"
                    />
                  </label>
                </div>
              ) : null}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default Gallery;
