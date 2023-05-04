import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./GrabSwiper.styles";

const INITIAL_CURSOR_STATE = {
  isDown: false,
  startX: 0,
  scrollLeft: 0,
};

const GrabSwiper = () => {
  const swiperContainerRef = React.useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState(INITIAL_CURSOR_STATE);
  const { classes } = useStyles({ isGrabbing: cursorState.isDown });

  const handleMouseUp = () => {
    setCursorState((prev) => ({ ...prev, isDown: false }));
    console.log("up");
  };

  const handleMouseLeave = () => {
    setCursorState((prev) => ({ ...prev, isDown: false }));
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
      e.preventDefault();
      const walk = e.offsetX - cursorState.startX;
      swiperContainerRef.current?.scrollTo({
        left: cursorState.scrollLeft - walk,
      });
    };

    swiper?.addEventListener("mousemove", handleMouseMove);
    return () => swiper?.removeEventListener("mousemove", handleMouseMove);
  }, [cursorState.isDown, cursorState.startX]);

  return (
    <div className={classes.swiperContainer} ref={swiperContainerRef}>
      <div className={classes.slide}>abcde</div>
      <div className={classes.slide}>kdjfkdjkfjjjj</div>
      <div className={classes.slide}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      <div className={classes.slide}>sdjkkkkkkkkkkkkkkkkk</div>
      <div className={classes.slide}>aa</div>
    </div>
  );
};

export default GrabSwiper;
