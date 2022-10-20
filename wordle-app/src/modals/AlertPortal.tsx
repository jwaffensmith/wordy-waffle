import React, { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Banner: FunctionComponent = ({ children }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const bannerRoot = document.getElementById("banner");
    if (!bannerRoot || !elRef.current) {
      return;
    }
    bannerRoot.appendChild(elRef.current);
    return () =>{
      if (elRef.current) { 
        bannerRoot.removeChild(elRef.current)
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Banner;


