// components/uploadthing/UploadThingButton.tsx
'use client';
import { UploadDropzone } from '@/utils/uploadthing';

export default function UploadThingButton() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center opacity-30 ">
      <UploadDropzone
        className="w-full h-full flex items-center justify-center border-none bg-neutral-100 dark:bg-neutral-950 ut-label:text-foreground ut-button:bg-primary ut-button:rounded-full ut-button:text-muted "
        endpoint="docUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res);
          // alert('Upload Completed');
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
