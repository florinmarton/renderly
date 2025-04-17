import { JsonBackground, JsonBaseElementProperties, JsonBorder, isJsonBackgroundSolid } from '../types/design.types.js';

/**
 * Creates base element styles from JsonBaseElementProperties
 * @returns A new React.CSSProperties object
 */
export function getBaseElementStyles(props: JsonBaseElementProperties): React.CSSProperties {
  if (!props) return {};

  const styles: React.CSSProperties = {
    position: 'absolute',
    left: props.x || 0,
    top: props.y || 0,
    width: props.width || 'auto',
    height: props.height || 'auto',
    opacity: props.opacity !== undefined ? props.opacity : 1,
    transform: props.rotation ? `rotate(${props.rotation}deg)` : undefined,
    zIndex: props.bannersetElementId || 0,
    display: props.visible ? undefined : 'none',
  };

  return styles;
}

/**
 * Creates background styles from JsonBackground
 * @returns A new React.CSSProperties object with background styles
 */
export function getBackgroundStyles(background?: JsonBackground): React.CSSProperties {
  if (!background) return {};

  const styles: React.CSSProperties = {};

  if (isJsonBackgroundSolid(background)) {
    styles.backgroundColor = background.scolor;
  }
  // @ToDo: Handle other background types

  return styles;
}

/**
 * Creates border styles from JsonBorder
 * @returns A new React.CSSProperties object with border styles
 */
export function getBorderStyles(border?: JsonBorder): React.CSSProperties {
  if (!border) return {};

  const styles: React.CSSProperties = {};

  styles.border = `${border.weight}px solid ${border.color}`;

  if (border.radius) {
    styles.borderRadius = `${border.radius}px`;
  }

  return styles;
}