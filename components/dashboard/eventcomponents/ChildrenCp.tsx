// components/dashboard/ChildrenCp.tsx

"use client";
import React from "react";
import { AnimatedTooltip } from "../../ui/animated-tooltip";

const calculateAge = (birthDateString: string): number => {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const ChildrenCp = ({ childs }: { childs: any[] }) => {
  const childrenItems = childs.map((child, index) => ({
    id: index,
    name: child.children.full_name,
    designation: `${child.children.gender}, ${calculateAge(child.children.birth_year)} years old`,
    image: child.children.avatar_url,
  }));

  return (
    <div className="mt-5 flex flex-row justify-center text-center">
      {childs.map((child: any, index: number) => (
        <div className="flex flex-col" key={index}>
          <div className="flex flex-col items-center">
            <AnimatedTooltip items={[childrenItems[index]]} />
          </div>
          {/* <div>{child.children.full_name}</div>
          <div>{child.children.gender}</div>
          <div>{child.children.birth_year}</div> */}
        </div>
      ))}
    </div>
  );
};

export default ChildrenCp;
