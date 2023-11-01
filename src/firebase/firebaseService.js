import { db, app } from "./config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";

class firebaseService {
  storage = null;
  constructor() {
    this.storage = getStorage(app);
  }

  imageUpload = async (images) => {
    console.log("Images Details: ********: ", images);
    try {
      const imagesURL = [];
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const name = images[i].name + Date.now();
          const storageRef = ref(this.storage, `/images/${name}`);
          const uploadTask = await uploadBytesResumable(storageRef, images[i]);
          const url = await getDownloadURL(uploadTask.ref);

          imagesURL.push({ src: url });
        }
        console.log("imagesURL: ******: ", imagesURL);

        const galleryDocRef = doc(db, "imagesgallery", "galleryDocument");
        const docSnapshot = await getDoc(galleryDocRef);
        const existingData = docSnapshot.data() || {};

        // Add the new images to the existing array
        const updatedImages = [...(existingData.images || []), ...imagesURL];

        // Update the document with the new image array
        await setDoc(galleryDocRef, {
          images: updatedImages,
          name: "addImages",
        });

        return { success: "Images Uploaded Successfully!" };
      } else {
        return { error: "Please provide your images" };
      }
    } catch (err) {
      return { error: "Failed to Upload Images, Something went wrong!" };
    }
  };

  getImages = async () => {
    try {
      const galleryDocRef = doc(db, "imagesgallery", "galleryDocument");
      const docSnapshot = await getDoc(galleryDocRef);
      const galleryData = docSnapshot.data() || {};
      const images = galleryData.images || [];
      console.log(images);

      return images;
    } catch (err) {
      return { error: "Failed to Get Images, Something went wrong!" };
    }
  };

  deleteImage = async (imagesToDelete) => {
    try {
      const galleryDocRef = doc(db, "imagesgallery", "galleryDocument");
      const docSnapshot = await getDoc(galleryDocRef);
      const existingData = docSnapshot.data() || {};

      // Extract URLs from the objects in the imagesToDelete array
      const urlsToDelete = imagesToDelete.map((image) => image.src);

      // Filter out the images to delete
      const updatedImages = (existingData.images || []).filter(
        (image) => !urlsToDelete.includes(image.src)
      );

      // Update the document with the new image array
      await setDoc(galleryDocRef, {
        images: updatedImages,
        name: "addImages",
      });

      // Delete the selected images from Firebase Storage
      await Promise.all(
        urlsToDelete.map((urlToDelete) =>
          this.deleteImageWithRetry(urlToDelete)
        )
      );

      return { success: "Images Deleted Successfully!" };
    } catch (err) {
      return { error: "Failed to Delete Images, Something went wrong!" };
    }
  };

  async deleteImageWithRetry(urlToDelete) {
    const imageRef = ref(this.storage, urlToDelete);

    for (let retry = 1; retry <= 3; retry++) {
      // Retry up to 3 times
      try {
        await deleteObject(imageRef);
        return;
      } catch (error) {
        console.error(`Retry ${retry} - Failed to delete image: ${error}`);
      }
    }

    console.error("Max retries reached, image not deleted.");
  }
}

export default new firebaseService();
