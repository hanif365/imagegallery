![projectimage](https://github.com/hanif365/imagegallery/assets/55603798/c4c23fe7-5afd-4ae8-8d00-b5036172cd69)

## Project Name: Image Gallery

[Project Live Link](https://imagegallery1.vercel.app)

## Overview:
"Image Gallery" is a web application that allows users to create, manage, and interact with image collections. 
 With a focus on user-friendly and dynamic functionality, this project leverages Firebase Firestore to store 
 images seamlessly.

## Key Features:

1. **Dynamic Image Upload:**
    - Users can upload multiple images to their gallery, which are instantly stored in Firebase Firestore, 
      ensuring easy management and access.

2. **Drag and Drop Support:**
    - The application offers an intuitive drag-and-drop interface for arranging images within the gallery, 
      giving users full control over the display order.

3. **Feature Image Selection:**
    - Users can designate a featured image from their collection, making it the primary representation of 
      the gallery. This allows for customization and personalization.

4. **Multi-Image Selection:**
    - The project provides the ability to select multiple images simultaneously, simplifying tasks such as deletion.

5. **Image Deletion:**
    - Users can delete selected images from their gallery with a single action, streamlining the management 
      of their image collection.

6. **Responsive Design:**
    - The user interface is designed to be responsive, adapting to various screen sizes and devices for 
      a seamless user experience.


## Upcoming Features:

1. **Enhanced Drag and Drop Functionality:**
    - Improve the drag and drop experience to make it even smoother, both horizontally and vertically, 
      for seamless image arrangement within the gallery.

2. **User Authentication:**
    - Implement user authentication to enhance the security and privacy of galleries, ensuring that 
      only authorized users can access and manage their collections.

3. **Individual User Dashboards:**
    - Create personalized dashboards for each user, providing a dedicated space for them to manage and showcase 
      their image collections, settings, and other user-specific features.
 
## Technologies Used:
   - React JS
   - react-beautiful-dnd
   - Firebase (Firestore)
   - Tailwindcss
   - react-toastify
   - dotenv
     
## Setting up the application on your local machine
   - Clone the repository
```bash
git clone https://github.com/hanif365/imagegallery.git
```
   - Change directory to the project folder
```bash
cd imagegallery
```
   - Install dependencies
```bash
npm install
```

## Configure Firebase

Before using the project, you'll need to configure Firebase. Follow these steps:

1. **Create a Firebase Project:**

    - If you don't have a Firebase project, go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. **Initialize Firestore:**

    - In your Firebase project, navigate to "Firestore Database" from the left sidebar.
    - Click the "Create Database" button to get started.
   
3. **Set Up Data:**

    - Start adding collections and documents to your Firestore database using the Firebase Console.
      
4. **Create an .env file:**

     - In the project root directory, create a `.env` file if it doesn't already exist.

     - Add the Firebase configuration variables to your `.env` file:

   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

## Run application
 - To run your application, you can typically use the following command in your project's root directory:
```bash
npm start
```


# Happy Coding
