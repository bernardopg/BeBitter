import { useEffect, useMemo, useReducer, useRef } from 'react';
import { CONFIG } from '@/constants/config';
import type { Easing } from 'framer-motion';

interface AnimationState {
  visibleSections: Set<string>;
  prefersReducedMotion: boolean;
}

type AnimationAction =
  | { type: 'SET_VISIBLE'; sectionId: string }
  | { type: 'SET_REDUCED_MOTION'; value: boolean };

const animationReducer = (state: AnimationState, action: AnimationAction): AnimationState => {
  switch (action.type) {
    case 'SET_VISIBLE':
      return {
        ...state,
        visibleSections: new Set([...state.visibleSections, action.sectionId])
      };
    case 'SET_REDUCED_MOTION':
      return {
        ...state,
        prefersReducedMotion: action.value
      };
    default:
      return state;
  }
};

export const useScrollAnimation = () => {
  const [state, dispatch] = useReducer(animationReducer, {
    visibleSections: new Set<string>(),
    prefersReducedMotion: false,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<Element, string>>(new Map());

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    dispatch({ type: 'SET_REDUCED_MOTION', value: mediaQuery.matches });

    const handleChange = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_REDUCED_MOTION', value: e.matches });
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = elementsRef.current.get(entry.target);
            if (sectionId) {
              dispatch({ type: 'SET_VISIBLE', sectionId });
            }
          }
        });
      },
      {
        threshold: CONFIG.INTERSECTION_THRESHOLD,
        rootMargin: CONFIG.LAZY_LOAD_ROOT_MARGIN,
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const registerElement = (element: Element | null, sectionId: string) => {
    if (!element || !observerRef.current) return;

    elementsRef.current.set(element, sectionId);
    observerRef.current.observe(element);
  };

  const unregisterElement = (element: Element | null) => {
    if (!element || !observerRef.current) return;

    elementsRef.current.delete(element);
    observerRef.current.unobserve(element);
  };

  const isVisible = (sectionId: string) => state.visibleSections.has(sectionId);

  const getAnimationProps = useMemo(() => {
    if (state.prefersReducedMotion) {
      return {
        initial: {},
        animate: {},
        transition: { duration: 0 },
      };
    }

    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: CONFIG.ANIMATION_DURATION,
        ease: [0.4, 0.0, 0.2, 1] as Easing
      },
    };
  }, [state.prefersReducedMotion]);

  const getStaggeredAnimationProps = (index: number) => {
    if (state.prefersReducedMotion) {
      return getAnimationProps;
    }

    return {
      ...getAnimationProps,
      transition: {
        ...getAnimationProps.transition,
        delay: index * CONFIG.ANIMATION_DELAY_INCREMENT,
      },
    };
  };

  return {
    registerElement,
    unregisterElement,
    isVisible,
    prefersReducedMotion: state.prefersReducedMotion,
    getAnimationProps,
    getStaggeredAnimationProps,
  };
};
