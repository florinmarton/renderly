import React from 'react';
import { render } from '@testing-library/react';
import { IMAGE_URL_PREFIX, ImageElement } from './ImageElement.js';

// Mock data for testing
const mockImageElement = {
  type: 'image',
  properties: {
    url: 'test',
    scaleMode: 'aspect',
  }
};

const mockStyle = {
  left: 10,
  top: 20,
  width: 300,
  height: 200,
  opacity: 0.8,
};

describe('ImageElement', () => {
  it('renders correctly with all props', () => {
    const { container } = render(
      <ImageElement
        element={mockImageElement as any}
        style={mockStyle}
      />
    );

    const imageDiv = container.querySelector('.element.image-element');
    expect(imageDiv).toBeInTheDocument();
    expect(imageDiv).toHaveStyle({
      backgroundImage: `${IMAGE_URL_PREFIX}test`,
    });
  });

  it('applies object-fit contain when scaleMode is "aspect"', () => {
    const elementWithContain = {
      ...mockImageElement,
      properties: {
        ...mockImageElement.properties,
        scaleMode: 'aspect',
      }
    };

    const { container } = render(
      <ImageElement
        element={elementWithContain as any}
        style={mockStyle}
      />
    );

    const imageDiv = container.querySelector('.element.image-element');
    expect(imageDiv).toHaveStyle({
      backgroundSize: 'contain',
    });
  });
});