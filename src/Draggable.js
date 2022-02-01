import React from "react";

function Draggable({ children }) {
  const targetRef = React.useRef(null);

  const mouseDown = (e) => {
    const targetRect = targetRef.current.getBoundingClientRect();

    const [startX, startY] = [e.clientX, e.clientY];

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const mouseMove = (e) => {
      targetRef.current.style.opacity = "0.7";
      let nextOffsetX = targetRect.x + e.clientX - startX;
      let nextOffsetY = targetRect.y + e.clientY - startY;

      if (nextOffsetX < 0) {
        nextOffsetX = 0;
      } else if (nextOffsetX + targetRect.width > viewportWidth) {
        nextOffsetX = viewportWidth - targetRect.width;
      }
      if (nextOffsetY < 0) {
        nextOffsetY = 0;
      } else if (nextOffsetY + targetRect.height > viewportHeight) {
        nextOffsetY = viewportHeight - targetRect.height;
      }
      targetRef.current.style.left = `${nextOffsetX}px`;
      targetRef.current.style.top = `${nextOffsetY}px`;
    };

    const mouseUp = (e) => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      targetRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const TargetComponent = React.cloneElement(children, {
    ref: targetRef,
    onMouseDown: mouseDown,
    style: { position: "absolute" },
  });

  return <React.Fragment>{TargetComponent}</React.Fragment>;
}

export default Draggable;
