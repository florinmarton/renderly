import React from 'react';
import { JsonBaseElementProperties, JsonTransition, JsonTransitionMid } from '../../types/design.types.js';

interface AnimationWrapperProps {
  children: React.ReactNode;
  props: JsonBaseElementProperties;

}

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  props
}) => {
  const { buildIn, buildMid, buildOut } = props;

  const getAnimationClass = (animation: JsonTransition | JsonTransitionMid, phase: 'In' | 'Mid' | 'Out') => {
    if (!animation || animation.type === 'none') return '';
    return `build${phase} animation-${animation.type}`;
  };

  const getAnimationStyle = (animation: JsonTransition | JsonTransitionMid): React.CSSProperties => {
    if (!animation || animation.type === 'none') return {};
    return {
      animationDuration: `${animation.duration * 1000}ms`,
      animationDelay: `${(animation.delay || 0) * 1000}ms`,
    };
  };

  return (
    <>
      {buildIn && (
        <div
          className={getAnimationClass(buildIn, 'In')}
          style={getAnimationStyle(buildIn)}
        >
          {buildMid && buildMid.type !== 'none' && (
            <div
              className={getAnimationClass(buildMid, 'Mid')}
              style={getAnimationStyle(buildMid)}
            >
              {buildOut && buildOut.type !== 'none' && (
                <div
                  className={getAnimationClass(buildOut, 'Out')}
                  style={getAnimationStyle(buildOut)}
                >
                  {children}
                </div>
              ) || children}
            </div>
          ) || children}
        </div>
      ) || children}
    </>
  );
};