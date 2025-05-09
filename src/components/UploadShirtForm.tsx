"use client"

import React, { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { uploadShirt } from '@/actions/actions'

export default function UploadShirtForm() {
   const [shirtName, setShirtName] = useState("")
   const [shirtPrice, setShirtPrice] = useState(0)
   const [shirtType, setShirtType] = useState("")
   const [shirtStyle, setShirtStyle] = useState("")
   const [uploadImage, setUploadImage] = useState<File | null>(null)
   const [previewUrl, setPreviewUrl] = useState<string>("https://ik.imagekit.io/ZephyrShard/shirt-store/upload-image.jpg?updatedAt=1746662285243")

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
         setUploadImage(file)
         setPreviewUrl(URL.createObjectURL(file))
      }
   }

   useEffect(() => {
      if (shirtPrice < 0) {
         setShirtPrice(0)
      }
   }, [shirtPrice])

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData()
      formData.append("name", shirtName)
      formData.append("price", shirtPrice.toString())
      formData.append("shirt_type", shirtType)
      formData.append("style_type", shirtStyle)
      if (uploadImage) {
         formData.append("design_url", uploadImage)
      }

      await uploadShirt(formData)
   }

   return (
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-around h-128 w-full space-x-4">

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
            onChange={handleFileChange} 
            className="p-2 w-32 rounded-lg shadow-lg"
         />

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
            value={shirtPrice} 
            onChange={(e) => setShirtPrice(parseInt(e.target.value))} 
            className="p-2 w-full rounded-lg shadow-lg"
         />

         <button type="submit" className="bg-amber-300 p-4 w-32 text-center rounded-4xl">
            Upload
         </button>
      </form>
   )
}
