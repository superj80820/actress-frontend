import React, { useRef, useState, useEffect, ReactNode } from 'react'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


const ScrollContainer = (props: { children: ReactNode[] }) => {
  const { width } = useWindowDimensions();
  const scrollContainerRef = useRef(null);
  const [justifyContent, setJustifyContent] = useState('center');

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      if (scrollWidth > clientWidth) {
        setJustifyContent('flex-start');
      } else {
        setJustifyContent('center');
      }
    }
  }

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [props.children]);

  return (
    <div className="scroll-container" ref={scrollContainerRef} style={{
      width: `${width}px`,
      justifyContent: justifyContent
    }}>
      {props.children.map((item, index) => (
        <div key={index}>
          {item}
        </div>
      ))}
    </div>
  )
}

export default ScrollContainer