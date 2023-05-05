import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./GrabSwiper.styles";

const INITIAL_CURSOR_STATE = {
  isDown: false,
  startX: 0,
  scrollLeft: 0,
};

export class SwiperVariables {
  public static isDragging = false;
}

const GrabSwiper = () => {
  const swiperContainerRef = React.useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState(INITIAL_CURSOR_STATE);
  const [isDrag, setIsDrag] = useState(false);
  const { classes } = useStyles({
    isGrabbing: cursorState.isDown,
    isDragging: isDrag,
  });

  const swipeRight = () => {
    const moveTo = cursorState.scrollLeft + 150;
    swiperContainerRef?.current?.scrollTo({
      left: moveTo,
      behavior: "smooth",
    });
    setCursorState((prev) => ({
      ...prev,
      scrollLeft: moveTo,
    }));
  };
  const swipeLeft = () => {
    if (cursorState.scrollLeft === 0) return;
    let moveTo = cursorState.scrollLeft - 150;
    if (moveTo < 0) {
      moveTo = 0;
    }

    swiperContainerRef?.current?.scrollTo({
      left: moveTo,
      behavior: "smooth",
    });
    setCursorState((prev) => ({
      ...prev,
      scrollLeft: moveTo,
    }));
  };

  const handleMouseUp = () => {
    setCursorState((prev) => ({ ...prev, isDown: false }));
    SwiperVariables.isDragging = false;
    setIsDrag(false);
  };

  const handleMouseLeave = () => {
    setCursorState((prev) => ({ ...prev, isDown: false }));
    setIsDrag(false);
  };

  //   todo: mousedown
  useEffect(() => {
    const swiper = swiperContainerRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      swiper &&
        setCursorState((prev) => ({
          ...prev,
          isDown: true,
          startX: e.offsetX,
          scrollLeft: swiper?.scrollLeft,
        }));
    };

    swiper?.addEventListener("mousedown", handleMouseDown);
    return () => swiper?.removeEventListener("mousedown", handleMouseDown);
  }, []);

  //   todo: mouseleave
  useEffect(() => {
    const swiper = swiperContainerRef.current;
    swiper?.addEventListener("mouseleave", handleMouseLeave);
    return () => swiper?.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  //   todo: mouse up
  useEffect(() => {
    const swiper = swiperContainerRef.current;

    swiper?.addEventListener("mouseup", handleMouseUp);
    return () => swiper?.removeEventListener("mouseup", handleMouseUp);
  }, []);

  //   todo: mouse move

  useEffect(() => {
    const swiper = swiperContainerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorState.isDown) return;
      // SwiperVariables.isDragging = true;

      e.preventDefault();
      const walk = e.offsetX - cursorState.startX;
      // !isDrag && setIsDrag(true);
      swiperContainerRef.current?.scrollTo({
        left: cursorState.scrollLeft - walk,
      });
    };

    swiper?.addEventListener("mousemove", handleMouseMove);
    return () => swiper?.removeEventListener("mousemove", handleMouseMove);
  }, [cursorState.isDown, cursorState.startX]);

  useEffect(() => {
    console.log(isDrag);
  }, [isDrag]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.arrow} onClick={swipeLeft}>
        {" "}
        {"<"}
      </div>
      <div className={classes.swiperContainer} ref={swiperContainerRef}>
        <div className={classes.slide} onClick={() => console.log("clicked")}>
          abcde
        </div>
        <div className={classes.slide}>kdjfkdjkfjjjj</div>
        <div className={classes.slide}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div className={classes.slide}>sdjkkkkkkkkkkkkkkkkk</div>
        <div className={classes.slide}>aa</div>
      </div>
      <div className={classes.arrow} onClick={swipeRight}>
        {" "}
        {">"}
      </div>
    </div>
  );
};

export default GrabSwiper;
