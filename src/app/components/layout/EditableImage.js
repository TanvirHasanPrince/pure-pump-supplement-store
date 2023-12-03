import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev?.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading..",
        success: "Upload complete",
        error: "Upload Error",
      });
    }
  }

  return (
    <>
      {" "}
      <div>
        <div className="relative p-2 rounded-lg max-w-[120px]">
          {link && (
            <Image
              className="rounded-lg w-full h-full mb-4"
              src={link}
              width={200}
              height={200}
              alt="User Profile Image"
            ></Image>
          )}
          {!link && (
            <div className=" text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-2">
              No Image
            </div>
          )}
          <label>
            <input type="file" hidden onChange={handleFileChange} />
            <span className="bg-secondary text-black px-8 py-2 rounded-md font-bold cursor-pointer">
              Edit
            </span>
          </label>
        </div>
      </div>
    </>
  );
}
