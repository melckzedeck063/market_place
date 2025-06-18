import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { BASE_URL } from "../store/urls";
import { CREATE_RESTAURANT } from "../apollo/Mutations";


export default function AddRestaurantModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const [uploading, setUploading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
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
      console.log("Upload result:", result);
      setValue("coverPhoto", result.data); // Set uploaded file URL
    } catch (err) {
      console.error("File upload failed:", err);
      alert("Failed to upload image.");
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
        setResponseMsg(`❌ ${data.createRestaurant.message}`);
      } else {
        setResponseMsg(`✅ ${data.createRestaurant.message}`);
        reset();
        onClose(); // Close modal if success
      }
    } catch (error) {
      console.error("GraphQL error:", error);
      setResponseMsg("❌ Failed to create restaurant.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">New Store</h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input {...register("name", { required: "Name is required" })} placeholder="Name" className="border p-2 rounded" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <input {...register("email", { required: "Email is required" })} placeholder="Email" className="border p-2 rounded" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <input {...register("phone", { required: "Phone is required" })} placeholder="Phone" className="border p-2 rounded" />
            <input {...register("address", { required: "Address is required" })} placeholder="Address" className="border p-2 rounded" />
            <input {...register("latitude", { required: true })} placeholder="Latitude" type="number" step="any" className="border p-2 rounded" />
            <input {...register("longitude", { required: true })} placeholder="Longitude" type="number" step="any" className="border p-2 rounded" />
            <input {...register("openTime", { required: true })} placeholder="Opening Time" type="time" className="border p-2 rounded" />
            <input {...register("closingTime", { required: true })} placeholder="Closing Time" type="time" className="border p-2 rounded" />
          </div>

          <input {...register("openingDays", { required: true })} placeholder="Opening Days (comma-separated)" className="border p-2 rounded w-full" />
          <textarea {...register("description", { required: true })} placeholder="Description" className="border p-2 rounded w-full" />

          <div>
            <label className="block mb-1">Cover Photo</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded w-full" />
            {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
            <input type="hidden" {...register("coverPhoto", { required: true })} />
            {errors.coverPhoto && <p className="text-red-500 text-sm">Cover photo is required</p>}
          </div>

          {loading && <p className="text-sm text-teal-600">Saving restaurant...</p>}
          {responseMsg && <p className="text-sm mt-2">{responseMsg}</p>}

          <div className="flex justify-end space-x-4">
  <button
    type="button"
    onClick={onClose}
    className="px-4 py-2 bg-gray-400 text-white rounded"
    disabled={loading}
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading}
    className={`px-4 py-2 rounded text-white flex items-center justify-center ${
      loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600"
    }`}
  >
    {loading ? (
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
    ) : null}
    {loading ? "Saving..." : "Save"}
  </button>
</div>

        </form>
      </div>
    </div>
  );
}
