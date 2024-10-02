"use client";

import { formUrlQuery } from "@/sanity/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const links = ["all", "Next 13", "frontend", "backend", "fullstack"];

const Filters = () => {
  const [activeLink, setActiveLink] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (link: string) => {
    let newUrl = "";
    if (activeLink === link) {
      setActiveLink("");
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    } else {
      setActiveLink(link);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: link.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full gap-2 overflow-auto py-12 sm:max-w-2xl">
      {links.map((link, i) => (
        <button
          className={`${activeLink === link ? "gradient_blue-purple" : ""} whitespace-nowrap rounded-lg px-8 py-2.5 capitalize`}
          key={i}
          onClick={() => handleFilter(link)}
        >
          {link}
        </button>
      ))}
    </ul>
  );
};

export default Filters;
