import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

const UploadAvatar = ({ signUpData, setSignUpData }) => {
  const [image, setImage] = useState(null);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setShowModal(true);
    }
  };
  // Capture crop area
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Convert cropped image to Base64
  const getCroppedImage = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;

    await new Promise((resolve) => (img.onload = resolve));

    const { x, y, width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

    const base64Image = canvas.toDataURL("image/jpeg");
    setSignUpData({ ...signUpData, profileImage: base64Image });
    console.log("Base64:", base64Image);
    setShowModal(false);
  };
  return (
    <>
      <label className="flex items-center justify-center px-4 py-2 rounded-full bg-blue-100  text-blue-400 font-semibold cursor-pointer shadow-md hover:bg-blue-300 hover:text-white">
        Upload Profile Picture
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {showModal && (
        <div className="fixed inset-0  bg-opacity-70 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 border border-amber-400">
          <div className="bg-white p-1 w-1/3 h-2/3 rounded-lg shadow-lg">
            <div className="relative w-full h-[85%] ">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => {
                  setImage(null);
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={getCroppedImage}
                className="py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadAvatar;
