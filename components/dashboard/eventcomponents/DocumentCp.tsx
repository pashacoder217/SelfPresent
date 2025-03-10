"use client";
import Image from "next/image";

const DocumentCp = (childs: any) => {
  const downloadFile = async (url: string) => {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = getFilename(url);
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  };

  const getFilename = (url: string): string => {
    return url.split("/").pop() || "download";
  };
  return (
    <div className="mt-5">
      {childs.childs.map((child: any, index: number) => {
        return (
          <div className="" key={index}>
            {/* <div className="">
              <Image src="" width={50} height={50} alt="docType" />
            </div> */}
            <div>{child.documents.title}</div>
            <div>{child.documents.description}</div>
            <div>{child.documents.date}</div>
            <a
              href={child.documents.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                downloadFile(child.documents.url);
              }}
            >
              <div className="mt-2 flex items-end gap-2 underline">
                Download
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default DocumentCp;
