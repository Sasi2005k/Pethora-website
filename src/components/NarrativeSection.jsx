import { useEffect, useRef, useState } from 'react';

export default function NarrativeSection({ id, children, align = 'center', onVisible }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && onVisible) {
          onVisible(id);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-8% 0px -8% 0px',
      }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [id, onVisible]);

  // Determine justification based on alignment preferences
  const getJustification = () => {
    if (align === 'left') return 'flex-start';
    if (align === 'right') return 'flex-end';
    return 'center';
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="scrolly-section"
      style={{ justifyContent: getJustification() }}
    >
      <div className={`glass-panel narrative-box ${isVisible ? 'visible' : 'hidden'}`}>
        {children}
      </div>
    </section>
  );
}
