import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { BASE_URL } from "../store/urls";
import { CREATE_RESTAURANT } from "../apollo/Mutations";
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";

export default function AddRestaurantModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [uploading, setUploading] = useState(false);
  const [createRestaurant, { loading }] = useMutation(CREATE_RESTAURANT);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await fetch(`${BASE_URL}/files/upload/image`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.data) {
        toast.success("Image uploaded successfully!");
        setValue("coverPhoto", result.data);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("File upload failed:", err);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (formData) => {
    try {
      const variables = {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      };
      const { data } = await createRestaurant({ variables });
      if (data?.createRestaurant?.error) {
        toast.error(data.createRestaurant.message);
      } else {
        toast.success(data.createRestaurant.message || "Restaurant created!");
        reset();
        onClose();
      }
    } catch (error) {
      console.error("GraphQL error:", error);
      toast.error("Failed to create restaurant.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">New Store</h2>

              <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Name"
                      className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <input
                      {...register("email", { required: "Email is required" })}
                      placeholder="Email"
                      type="email"
                      className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      placeholder="Phone"
                      className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <input
                      {...register("address", { required: "Address is required" })}
                      placeholder="Address"
                      className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <input
                      {...register("latitude", { required: "Latitude is required" })}
                      placeholder="Latitude"
                      type="number"
                      step="any"
                      className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                        errors.latitude ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.latitude && (
                      <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <input
                      {...register("longitude", { required: "Longitude is required" })}
                      placeholder="Longitude"
                      type="number"
                      step="any"
                      className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                        errors.longitude ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.longitude && (
                      <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="sr-only">Opening Time</label>
                    <input
                      {...register("openTime", { required: "Opening time is required" })}
                      placeholder="Opening Time"
                      type="time"
                      className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                        errors.openTime ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.openTime && (
                      <p className="text-red-500 text-sm mt-1">{errors.openTime.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="sr-only">Closing Time</label>
                    <input
                      {...register("closingTime", { required: "Closing time is required" })}
                      placeholder="Closing Time"
                      type="time"
                      className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                        errors.closingTime ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.closingTime && (
                      <p className="text-red-500 text-sm mt-1">{errors.closingTime.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <input
                    {...register("openingDays", { required: "Opening days required" })}
                    placeholder="Opening Days (comma-separated)"
                    className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                      errors.openingDays ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.openingDays && (
                    <p className="text-red-500 text-sm mt-1">{errors.openingDays.message}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <textarea
                    {...register("description", { required: "Description required" })}
                    placeholder="Description"
                    rows={4}
                    className={`border rounded px-4 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="block mb-1 font-medium text-gray-700">Cover Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                  {uploading && (
                    <p className="text-sm text-blue-500 mt-1">Uploading...</p>
                  )}
                  <input
                    type="hidden"
                    {...register("coverPhoto", { required: "Cover photo required" })}
                  />
                  {errors.coverPhoto && (
                    <p className="text-red-500 text-sm mt-1">{errors.coverPhoto.message}</p>
                  )}
                </div>

                {loading && (
                  <p className="text-sm text-teal-600">Saving restaurant...</p>
                )}

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 rounded text-white flex items-center justify-center transition ${
                      loading
                        ? "bg-teal-400 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700"
                    }`}
                  >
                    {loading && (
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                    )}
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
