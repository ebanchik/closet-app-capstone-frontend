import React, { useEffect } from 'react';
import './App.css'; // Make sure this import points to your actual CSS file

export const CustomCursor: React.FC = () => {
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.display = 'block';
      }
    };

    const addHoverEffect = () => {
      const cursor = document.getElementById('custom-cursor');
      cursor?.classList.add('hovered');
    };

    const removeHoverEffect = () => {
      const cursor = document.getElementById('custom-cursor');
      cursor?.classList.remove('hovered');
    };

    // Elements that should change the cursor on hover
    const hoverElements = document.querySelectorAll('.hover-target');

    hoverElements.forEach((elem) => {
      elem.addEventListener('mouseenter', addHoverEffect);
      elem.addEventListener('mouseleave', removeHoverEffect);
    });

    window.addEventListener('mousemove', moveCursor);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverElements.forEach((elem) => {
        elem.removeEventListener('mouseenter', addHoverEffect);
        elem.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }, []);

  return <div id="custom-cursor"></div>;
};

export default CustomCursor;
