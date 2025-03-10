"use client";
import React from "react";
import Image from "next/image";

interface Props {
  childName: string;
  gender: string;
  date: string;
  url: string;
}
const AddedChild = ({ childName, gender, url, date }: Props) => {
  return (
    <div className="flex flex-grow-0 flex-col items-center">
      <div>
        <Image src={url} alt="avatar" width={50} height={50}/>
      </div>
      <div>{childName}</div>
      <div>{gender}</div>
      <div>{date}</div>
    </div>
  );
};
export default AddedChild;
