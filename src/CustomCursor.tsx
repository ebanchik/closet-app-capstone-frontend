import { useEffect } from 'react';

export const CustomCursor = () => {
  useEffect(() => {
    let frameId: number | undefined;

    const moveCursor = (e : MouseEvent) => {
      const cursor = document.getElementById('custom-cursor');
      if (!cursor) return;

      // Cancel the previous animation frame to prevent stacking
      if (frameId) cancelAnimationFrame(frameId);

      // Update cursor position using requestAnimationFrame for smoother performance
      frameId = requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.display = 'block';
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Functions for adding and removing 'hovered' class
    const addHoverEffect = () => {
      const cursor = document.getElementById('custom-cursor');
      cursor?.classList.add('hovered');
    };

    const removeHoverEffect = () => {
      const cursor = document.getElementById('custom-cursor');
      cursor?.classList.remove('hovered');
    };

    // Apply hover effects to all links and buttons
    document.querySelectorAll('a, button').forEach(elem => {
      elem.addEventListener('mouseenter', addHoverEffect);
      elem.addEventListener('mouseleave', removeHoverEffect);
    });

    // Cleanup function to remove event listeners and cancel animation frame
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button').forEach(elem => {
        elem.removeEventListener('mouseenter', addHoverEffect);
        elem.removeEventListener('mouseleave', removeHoverEffect);
      });

      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return <div id="custom-cursor" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999, display: 'none' }}></div>;
};

export default CustomCursor;
