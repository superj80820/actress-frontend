import React, { useRef, useState, useEffect, ReactNode } from 'react'
import Carousel from "../components/Carousel";
import ActressCard from "./ActressCard";
import Bar from "../components/Bar";
import { addFavorite } from '../repository/actress-api'
import Button from "@material-ui/core/Button";
import AdCard from "../components/AdCard";
import DonateCard from "../components/DonateCard";
import { useSearchParams } from 'react-router-dom';

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
      {props.children.map(item => (
        <div>
          {item}
        </div>
      ))}
    </div>
  )
}

export default ScrollContainer