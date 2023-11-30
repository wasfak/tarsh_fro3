import { Inter } from "next/font/google";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("File uploaded successfully:", result.filePath);
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <div className="flex flex-col rounded-xl shadow-2xl items-center justify-center p-8 gap-y-6">
        <h1 className="capitalize font-bold text-3xl">upload file</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload} disabled={!file}>
          {isUploading ? "Uploading.." : "upload"}
        </button>
      </div>
    </div>
  );
};

export default Home;
