"use client";

import React, { useEffect, useState, useRef } from "react";

import { HeaderData } from "@/app/types/headerData";
import { fetchHeaderData } from "@/app/generalFunctions/apiDataFetches/fetchHeaderData";
import MobileHeader from "@/app/ui/headerAndFooter/header/mobileHeader";
import DesktopHeader from "@/app/ui/headerAndFooter/header/desktopHeader";
import "@/app/ui/styles/scss/components/header-and-footer/header/header.scss";

type HeaderParameters = {
  style?: string;
};

export default ({
  style,
  isMobile,
}: HeaderParameters & { isMobile: boolean }) => {
  const [windowScreenPositionY, setWindowScreenPositionY] = useState<number>(0);
  const [headerContent, setHeaderContent] = useState<HeaderData>();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.addEventListener(
      "scroll",
      (event) => {
        const targetElement = document.body.children[0];
        const currentWindowScreenPositionY =
          targetElement?.getBoundingClientRect().y;
        setWindowScreenPositionY(currentWindowScreenPositionY);
      },
      true
    );

    (async () => {
      const fetchedHeaderData = await fetchHeaderData();
      console.log({ fetchedHeaderData });
      setHeaderContent(fetchedHeaderData);
    })();
  }, []);

  useEffect(() => {
    if (windowScreenPositionY && windowScreenPositionY < 0 && !isScrolled) {
      setIsScrolled(true);
    } else if (
      (windowScreenPositionY || windowScreenPositionY === 0) &&
      windowScreenPositionY >= 0 &&
      isScrolled
    ) {
      setIsScrolled(false);
    }
  }, [windowScreenPositionY]);

  return (
    <section ref={headerRef} id={`kst-main-header`}>
      {headerContent ? (
        isMobile ? (
          <MobileHeader
            isScrolled={isScrolled}
            content={headerContent}
            style={style}
            headerRef={headerRef}
          />
        ) : (
          <DesktopHeader
            isScrolled={isScrolled}
            content={headerContent}
            style={style}
          />
        )
      ) : (
        <></>
      )}
    </section>
  );
};
