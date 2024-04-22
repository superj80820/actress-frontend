import React, { useRef, useState, useEffect, ReactNode } from 'react'

const ScrollContainer = (props: { children: ReactNode[] }) => {
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
    // 处理窗口尺寸变化
    window.addEventListener('resize', checkScroll);
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <div className="scroll-container" ref={scrollContainerRef} style={{ justifyContent: justifyContent }}>
      {props.children.map((item, index) => (
        <div key={index}>
          {item}
        </div>
      ))}
    </div>
  )
}

export default ScrollContainer