import { getBaseElementStyles, getBackgroundStyles, getBorderStyles } from './style.js';
import { JsonBackground } from '../types/design.types.js';

describe('Style Utilities', () => {
  describe('getBaseElementStyles', () => {
    it('should return empty object when props is undefined', () => {
      expect(getBaseElementStyles(undefined as any)).toEqual({});
    });

    it('should return correct styles for base element properties', () => {
      const props = {
        x: 10,
        y: 20,
        width: 100,
        height: 200,
        opacity: 0.5,
        rotation: 45,
        bannersetElementId: 123,
        visible: true,
        id: 123,
        layerName: 'image'
      };

      const result = getBaseElementStyles(props);

      expect(result).toEqual({
        position: 'absolute',
        left: 10,
        top: 20,
        width: 100,
        height: 200,
        opacity: 0.5,
        transform: 'rotate(45deg)',
        zIndex: 123,
        display: undefined,
      });
    });

    it('should handle default values when properties are missing', () => {
      const props = {} as any;

      const result = getBaseElementStyles(props);

      expect(result).toEqual({
        position: 'absolute',
        left: 0,
        top: 0,
        width: 'auto',
        height: 'auto',
        opacity: 1,
        transform: undefined,
        zIndex: 0,
        display: undefined,
      });
    });

    it('should set display to none when visible is false', () => {
      const props = {
        visible: false,
      } as any;

      const result = getBaseElementStyles(props);

      expect(result.display).toBe('none');
    });
  });

  describe('getBackgroundStyles', () => {
    it('should return empty object when background is undefined', () => {
      expect(getBackgroundStyles(undefined)).toEqual({});
    });

    it('should set backgroundColor when background has scolor property', () => {
      const background: JsonBackground = {
        type: 'solid',
        scolor: '#ff0000'
      };

      const result = getBackgroundStyles(background);

      expect(result).toEqual({
        backgroundColor: '#ff0000',
      });
    });

    it('should return empty object when background has no scolor property', () => {
      const background = { type: 'smthElse' } as any;

      const result = getBackgroundStyles(background);

      expect(result).toEqual({});
    });
  });

  describe('getBorderStyles', () => {
    it('should return empty object when border is undefined', () => {
      expect(getBorderStyles(undefined)).toEqual({});
    });

    it('should set border and borderRadius', () => {
      const border = {
        weight: 2,
        color: '#000000',
        radius: 5,
      };

      const result = getBorderStyles(border);

      expect(result).toEqual({
        border: '2px solid #000000',
        borderRadius: '5px',
      });
    });

    it('should set only border when radius is missing', () => {
      const border = {
        weight: 2,
        color: '#000000',
      } as any;

      const result = getBorderStyles(border);

      expect(result).toEqual({
        border: '2px solid #000000',
      });
    });
  });
});