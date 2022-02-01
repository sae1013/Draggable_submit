import React, { useState, useCallback } from "react";

function Draggable2({ children }) {

  const [pos, setPos] = useState({ diffX: 0, diffY: 0 });
  const [style, setStyle] = useState({ position: "absolute" });
  const [dragging, setDragging] = useState(false);

  const mouseDownHandler = useCallback((e) => {
    const targetRect = e.target.getBoundingClientRect();
    setDragging(true);
    setPos({
      diffX: e.clientX - targetRect.x,
      diffY: e.clientY - targetRect.y,
    });
    setStyle({
      ...style,
      opacity:0.7
    })
  }, [style]);

  const mouseUpHandler = useCallback((e) => {
    setDragging(false);
    setStyle({...style,opacity:1})
  }, [style]);

  const mouseMoveHandler = useCallback(
    (e) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const targetRect = e.target.getBoundingClientRect();
      if (dragging) {
        let left = e.clientX - pos.diffX;
        let top = e.clientY - pos.diffY;

        if (left + targetRect.width > viewportWidth) {
          left = viewportWidth - targetRect.width;
        } else if (left < 0) {
          left = 0;
        }
        if (top + targetRect.height > viewportHeight) {
          top = viewportHeight - targetRect.height;
        } else if (top < 0) {
          top = 0;
        }
        setStyle({
          ...style,
          left,
          top,
        });
      }
    },
    [dragging, pos,style]
  );
  const mouseLeaveHandler = useCallback(() => {
    setDragging(false);
    setStyle({...style,opacity:1})
  },[style]);

  const TargetComponent = React.cloneElement(children, {
    onMouseDown: mouseDownHandler,
    onMouseUp: mouseUpHandler,
    onMouseMove: mouseMoveHandler,
    onMouseLeave: mouseLeaveHandler,
    style: style,
  });

  return <React.Fragment>{TargetComponent}</React.Fragment>;
}

export default Draggable2;
