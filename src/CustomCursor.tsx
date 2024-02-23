import React, { useEffect } from 'react';
import './App.css'; // Ensure this points to your CSS file

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

    window.addEventListener('mousemove', moveCursor);

    // Target all buttons and links
    const hoverElements = document.querySelectorAll('a, button');

    const addHoverEffect = () => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor) cursor.classList.add('hovered');
    };

    const removeHoverEffect = () => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor) cursor.classList.remove('hovered');
    };

    hoverElements.forEach(elem => {
      elem.addEventListener('mouseenter', addHoverEffect);
      elem.addEventListener('mouseleave', removeHoverEffect);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverElements.forEach(elem => {
        elem.removeEventListener('mouseenter', addHoverEffect);
        elem.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }, []);

  return <div id="custom-cursor"></div>;
};

export default CustomCursor;
