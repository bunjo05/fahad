import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Portfolio({ portfolio }) {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [featuredPreview, setFeaturedPreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    const [existingImages, setExistingImages] = useState([]);
    const [existingFeatured, setExistingFeatured] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        processing,
        reset,
        delete: destroy,
    } = useForm({
        id: null,
        name: "",
        featured_image: null,
        category: "",
        description: "",
        images: [],
    });

    // OPEN CREATE
    const openCreate = () => {
        reset();
        setIsEditing(false);
        setExistingImages([]);
        setExistingFeatured(null);

        setFeaturedPreview(null);
        setGalleryPreviews([]);

        setOpen(true);
    };

    // OPEN EDIT
    const openEdit = (item) => {
        setData({
            id: item.id,
            name: item.name,
            description: item.description || "",
            category: item.category || "",
            featured_image: null,
            images: [],
        });

        setExistingImages(item.images || []);
        setExistingFeatured(item.featured_image);

        setFeaturedPreview(null);
        setGalleryPreviews([]);

        setIsEditing(true);
        setOpen(true);
    };

    // SUBMIT (CREATE / UPDATE)
    const submit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route("dashboard.portfolio.update", data.id), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setOpen(false);
                },
            });
        } else {
            post(route("dashboard.portfolio.store"), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setOpen(false);
                },
            });
        }
    };

    // DELETE
    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this portfolio?")) return;

        destroy(route("dashboard.portfolio.destroy", id));
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Portfolio</h2>
                        <p className="text-gray-500 text-sm">
                            Manage your photography portfolio
                        </p>
                    </div>

                    <button
                        onClick={openCreate}
                        className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
                    >
                        + New Portfolio
                    </button>
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-3 gap-4">
                    {portfolio?.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-xl overflow-hidden bg-white shadow-sm"
                        >
                            <img
                                src={`/storage/${item.featured_image}`}
                                className="h-48 w-full object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-semibold">{item.name}</h3>

                                {/* ACTIONS */}
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() => openEdit(item)}
                                        className="text-xs px-3 py-1 bg-blue-500 text-white rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-xs px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                        {/* HEADER (fixed) */}
                        <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
                            <h3 className="text-lg font-bold">
                                {isEditing
                                    ? "Edit Portfolio"
                                    : "Create Portfolio"}
                            </h3>

                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        {/* SCROLLABLE BODY */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                            {/* NAME */}
                            <div>
                                <label className="text-sm font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label>Category</label>
                                <select
                                    name="category"
                                    id=""
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                >
                                    <option value="Weddings">Weddings</option>
                                    <option value="Graduations">
                                        Graduations
                                    </option>
                                    <option value="Portraits">Portraits</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Family">Family</option>
                                    <option value="Commercial">
                                        Commercial
                                    </option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="text-sm font-medium">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                    rows={3}
                                />
                            </div>

                            {/* FEATURED IMAGE */}
                            <div>
                                <label className="text-sm font-medium">
                                    Featured Image
                                </label>

                                {isEditing && existingFeatured && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Current:
                                        </p>
                                        <img
                                            src={`/storage/${existingFeatured}`}
                                            className="h-28 w-full object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];

                                        setData("featured_image", file);

                                        if (file) {
                                            setFeaturedPreview(
                                                URL.createObjectURL(file),
                                            );
                                        }
                                    }}
                                    className="w-full mt-2"
                                />
                                {(featuredPreview ||
                                    (isEditing && existingFeatured)) && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Preview:
                                        </p>
                                        <img
                                            src={
                                                featuredPreview
                                                    ? featuredPreview
                                                    : `/storage/${existingFeatured}`
                                            }
                                            className="h-28 w-full object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* GALLERY */}
                            <div>
                                <label className="text-sm font-medium">
                                    Gallery Images
                                </label>

                                {isEditing && existingImages.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {existingImages.map((img, index) => (
                                            <img
                                                key={index}
                                                src={`/storage/${img.image_path}`}
                                                className="h-20 w-full object-cover rounded-lg"
                                            />
                                        ))}
                                    </div>
                                )}

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        const files = Array.from(
                                            e.target.files,
                                        );

                                        setData("images", files);

                                        const previews = files.map((file) =>
                                            URL.createObjectURL(file),
                                        );

                                        setGalleryPreviews(previews);
                                    }}
                                    className="w-full mt-2"
                                />
                                {(galleryPreviews.length > 0 ||
                                    (isEditing &&
                                        existingImages.length > 0)) && (
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {/* NEW PREVIEWS */}
                                        {galleryPreviews.map((img, index) => (
                                            <img
                                                key={`new-${index}`}
                                                src={img}
                                                className="h-20 w-full object-cover rounded-lg"
                                            />
                                        ))}

                                        {/* EXISTING IMAGES (EDIT MODE) */}
                                        {isEditing &&
                                            galleryPreviews.length === 0 &&
                                            existingImages.map((img, index) => (
                                                <img
                                                    key={`old-${index}`}
                                                    src={`/storage/${img.image_path}`}
                                                    className="h-20 w-full object-cover rounded-lg"
                                                />
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* FOOTER (fixed) */}
                        <div className="border-t px-6 py-4 bg-white flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                type="button" // or "submit" if inside a form
                                onClick={submit} // 🔑 Missing handler
                                disabled={processing}
                                className="px-4 py-2 bg-amber-500 text-white rounded-lg"
                            >
                                {processing
                                    ? "Saving..."
                                    : isEditing
                                      ? "Update"
                                      : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
