import Cross from "../svgs/Cross";
import { useState, useEffect, useCallback, useMemo } from "react";
import Cropper from "react-easy-crop";
import useContentContext from "../../context/ContentContext";

// Utility to load image
async function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = url;
  });
}

// Main crop function
async function getCroppedImg(
  imageSrc,
  pixelCrop,
  opts = { mime: "image/png", quality: 0.92, asBlob: true }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const size = Math.max(pixelCrop.width, pixelCrop.height);
  canvas.width = size;
  canvas.height = size;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    size,
    size
  );

  if (opts.asBlob && canvas.toBlob) {
    return new Promise((resolve) =>
      canvas.toBlob(resolve, opts.mime, opts.quality)
    );
  }
  return canvas.toDataURL(opts.mime, opts.quality);
}

export default function UpdateProfile({ onCropped, file }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
const {setProfilePreview} = useContentContext();
  // Load file into imageSrc
  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  }, [file]);

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const canSave = useMemo(
    () => Boolean(imageSrc && croppedAreaPixels),
    [imageSrc, croppedAreaPixels]
  );

  const handleCrop = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setIsCropping(true);
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels, {
        asBlob: true,
        mime: "image/png",
        quality: 0.92,
      });
      onCropped?.(blob);
    } catch (e) {
      console.error(e);
      alert("Failed to crop image. Please try again.");
    } finally {
      setIsCropping(false);
    }
  }, [imageSrc, croppedAreaPixels, onCropped]);

  return imageSrc ? (
    <div className="w-[50%] h-[50%] shadow-lg flex flex-col gap-2 py-5">
        <div className="w-fit h-fit absolute top-2 right-2 " onClick={()=>setProfilePreview(null)}><Cross /></div>

     {/* Zoom Slider */}
      <div className="w-full flex flex-row justify-evenly items-center">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Zoom
        </label>
        <input
          className="w-full accent-blue-500"
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
      </div>

      {/* Action Buttons */}
      <div className=" flex gap-3 justify-end">
        <button
          onClick={handleCrop}
          disabled={!canSave || isCropping}
          className="px-4 py-1 rounded-xl shadow-sm border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                     hover:bg-gray-100 dark:hover:bg-gray-700 
                     disabled:opacity-50 transition"
        >
          {isCropping ? "Cropping…" : "Upload"}
        </button>
      </div>
      </div>
       {/* Cropper Area */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow border border-gray-200 dark:border-gray-700">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          restrictPosition
          showGrid={false}
        />
      </div>

      
      
    </div>
  ) : null;
}
