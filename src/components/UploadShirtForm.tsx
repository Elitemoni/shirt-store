"use client"

import React, { useState, useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import {
      ImageKitAbortError,
      ImageKitInvalidRequestError,
      ImageKitServerError,
      ImageKitUploadNetworkError,
      upload,
} from "@imagekit/next";

import { uploadShirt } from '@/actions/actions'

export default function UploadShirtForm() {
   const [shirtName, setShirtName] = useState("")
   const [shirtPrice, setShirtPrice] = useState<number>(0)
   const [shirtType, setShirtType] = useState("")
   const [shirtStyle, setShirtStyle] = useState("")
   const [imageKitUrl, setImageKitUrl] = useState<string | undefined>(undefined)
   const [previewUrl, setPreviewUrl] = useState<string>("https://ik.imagekit.io/ZephyrShard/shirt-store/upload-image.jpg?updatedAt=1746662285243")

   const [progress, setProgress] = useState(0);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const abortController = new AbortController();

   const authenticator = async () => {
      try {
         // Perform the request to the upload authentication endpoint.
         const response = await fetch("api/upload-auth");
         if (!response.ok) {
            // If the server response is not successful, extract the error text for debugging.
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
         }

         // Parse and destructure the response JSON for upload credentials.
         const data = await response.json();
         const { signature, expire, token, publicKey } = data;
         return { signature, expire, token, publicKey };
      } catch (error) {
         // Log the original error for debugging before rethrowing a new error.
         console.error("Authentication error:", error);
         throw new Error("Authentication request failed");
      }
   };

   const handleImageKitUpload = async () => {
      // Access the file input element using the ref
      const fileInput = fileInputRef.current;
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
         alert("Please select a file to upload");
         return;
      }

      // Extract the first file from the file input
      const file = fileInput.files[0];

      // Retrieve authentication parameters for the upload.
      let authParams;
      try {
         authParams = await authenticator();
      } catch (authError) {
         console.error("Failed to authenticate for upload:", authError);
         return;
      }
      const { signature, expire, token, publicKey } = authParams;

      // Call the ImageKit SDK upload function with the required parameters and callbacks.
      try {
         const uploadResponse = await upload({
            // Authentication parameters
            expire,
            token,
            signature,
            publicKey,
            file,
            fileName: file.name, // Optionally set a custom file name
            // Progress callback to update upload progress state
            onProgress: (event) => {
               setProgress((event.loaded / event.total) * 100);
            },
            // Abort signal to allow cancellation of the upload if needed.
            abortSignal: abortController.signal,
         });
         console.log("Upload response:", uploadResponse);
         setImageKitUrl(uploadResponse.url)
      } catch (error) {
         // Handle specific error types provided by the ImageKit SDK.
         if (error instanceof ImageKitAbortError) {
               console.error("Upload aborted:", error.reason);
         } else if (error instanceof ImageKitInvalidRequestError) {
               console.error("Invalid request:", error.message);
         } else if (error instanceof ImageKitUploadNetworkError) {
               console.error("Network error:", error.message);
         } else if (error instanceof ImageKitServerError) {
               console.error("Server error:", error.message);
         } else {
               // Handle any other errors that may occur.
               console.error("Upload error:", error);
         }
      }
   };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
         setPreviewUrl(URL.createObjectURL(file))
      }
   }

   const handleSubmit = async (formData: FormData) => {
      // ImageKit upload
      formData.set('design_url', imageKitUrl as string)

      // stripe product creation
      const res = await fetch('/api/products/create', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            name: formData.get('name'),
            //description: '',
            unit_amount: parseInt(formData.get('price') as string) * 100, // price in cents
            currency: 'usd',
         }),
      });
      const data = await res.json();
      console.log('>> Stripe Price ID:', data.priceId);

      console.log("UploadShirtForm form data:\n", formData)
      await uploadShirt(formData, data.priceId)
   }

   return (
      <form action={handleSubmit} className="flex-1 flex flex-col items-center justify-around h-128 w-full space-x-4">

         {/* name */}
         <input 
            type="text" 
            name="name"
            placeholder="Shirt Name" 
            value={shirtName} 
            onChange={(e) => setShirtName(e.target.value)} 
            className="p-2 w-full rounded-lg shadow-lg"
         />

         {/* image */}
         <Image 
            src={previewUrl}
            alt="Shirt Template"
            width={256}
            height={256}
            className="flex-1 h-full rounded-lg shadow-lg mb-4"
         />
         <input 
            type="file"
            name="design_url"
            alt="upload image" 
            accept="image/*"
            placeholder="Image URL"
            onChange={handleImageChange} 
            ref={fileInputRef}
            //value={imageKitUrl}
            className="p-2 w-32 rounded-lg shadow-lg"
         />
         <button 
            type="button"
            onClick={handleImageKitUpload} 
            className="bg-blue-400 hover:bg-blue-600 hover:cursor-pointer p-2 rounded-lg"
         >
            Upload Image
         </button>

         {/* style */}
         <input 
            type="text"
            name="style_type"
            placeholder="Shirt Style" 
            value={shirtStyle} 
            onChange={(e) => setShirtStyle(e.target.value)} 
            className="p-2 w-full rounded-lg shadow-lg"
         />

         {/* type */}
         <input 
            type="text"
            name="shirt_type"
            placeholder="Shirt Type" 
            value={shirtType} 
            onChange={(e) => setShirtType(e.target.value)} 
            className="p-2 w-full rounded-lg shadow-lg"
         />

         {/* price */}
         <input 
            type="number"
            name="price"
            placeholder="Shirt Price" 
            value={shirtPrice === 0 ? "" : shirtPrice} 
            onChange={(e) => e.target.value ? setShirtPrice(Number(parseInt(e.target.value))) : setShirtPrice(0)} 
            className="p-2 w-full rounded-lg shadow-lg"
            min="0"
         />

         {/* submit */}
         <button type="submit" disabled={!imageKitUrl} className="bg-amber-300 hover:bg-amber-500 hover:cursor-pointer p-4 w-32 text-center rounded-4xl">
            Submit to Store
         </button>

         <div>
            Upload progress: <progress value={progress} max={100}></progress> {progress == 100 ? "Ready to submit!" : `${progress.toFixed(0)}%`}
         </div>
      </form>
   )
}
