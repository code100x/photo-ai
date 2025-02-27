"use client";
import JSZip from "jszip";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BACKEND_URL, CLOUDFLARE_URL } from "@/app/config";
import toast from "react-hot-toast";

export function UploadModal({
  onUploadDone,
}: {
  onUploadDone: (zipUrl: string) => void;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
        <CloudUploadIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.multiple = true;
            input.onchange = async () => {
          
              try {
       
                const zip = new JSZip();
                const res = await axios.get(`${BACKEND_URL}/pre-signed-url`);
                
                const url = res.data.url;
                const key = res.data.key;
                if (!input.files || input.files.length === 0) {
                  throw new Error("No files selected.");
                }

                if (input.files) {
                  for (const file of input.files) {
                    const content = await file.arrayBuffer();
                    zip.file(file.name, content);
                  }
                  const content = await zip.generateAsync({ type: "blob" });
                  const formData = new FormData();
                  formData.append("file", content);
                  const uploadResponse = await axios.put(url, formData);
                  if (uploadResponse.status !== 200) {
                    throw new Error(
                      `File upload failed with status ${uploadResponse.status}`
                    );
                  }
                  onUploadDone(`${CLOUDFLARE_URL}/${key}`);
                }
              } catch (error) {
                console.error("Upload Error:", error);
                if (axios.isAxiosError(error)) {
                  if (!error.response) {
                    toast.error("Network error: Unable to reach the server.");
                  } else if (error.response.status === 403) {
                    toast.error("Access denied: Invalid credentials.");
                  } else if (error.response.status === 500) {
                    toast.error("Server error: Please try again later.");
                  } else {
                    toast.error(
                      `Upload failed: ${error.response.data?.message || "Unknown error"}`
                    );
                  }
                } else {
                  toast.error(error.message || "An unexpected error occurred.");
                }
              }
            };
            input.click();
          }}
        >
          Select Files
        </Button>
      </CardContent>
    </Card>
  );
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
