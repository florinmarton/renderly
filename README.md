# renderly
SSR tool for rendering json to htlm

### The app is deployed here: https://renderly-1.onrender.com/
### The service is deployed here: https://renderly-w4lq.onrender.com/api/render?hash=j2308jq

## How to use
1. Go to https://renderly-1.onrender.com/
2. Enter the hash of the design you want to render
3. Click the button to render the design

### Check [Server Documentation](/server/README.md) for more details on the server

## Description
A server-side rendering solution for transforming Creatopy JSON designs into static HTML, focusing on performance and scalability.

### Features Implemented
### 1. Server-Side Rendering (SSR) with React
- Custom SSR solution
- Transforms complex JSON designs into static HTML
- Reduces client-side JavaScript, improving load times and SEO

### 2. Design Data Layer

**JSON Fetching Service**
- Fetches design JSON from Creatopy's CDN
- URL pattern: `https://creatopy-cdn-b1a8267.s3.amazonaws.com/designs/{hash}/json`
- Error handling for invalid hashes or network issues
- Response validation against TypeScript types
- Integration with caching layer

**Caching Strategy**
The server implements a robust multi-layer caching strategy:

### Server-Side Caching
- **Primary**: Redis-based distributed cache for multi-instance deployments
- **Fallback**: Automatic in-memory cache if Redis is unavailable
- **TTL**: Configurable cache duration with automatic invalidation

### Browser-Side Caching
- HTTP Cache-Control headers with stale-while-revalidate
- Configurable fresh and stale durations
- Production-only caching for development convenience

[Detailed caching documentation](server/README.md#caching-strategy)
**Type Safety**
- Comprehensive TypeScript types for JSON structure
- Type guards for different element types
- Strong typing throughout the rendering pipeline

### 3. Element Support
**Text Elements**
- Support for rich text with multiple styles within single elements
- Proper handling of font styling

**Image Elements**

**Button Elements**

**Unknown Elements**
- Fallback rendering for unsupported element types
- Debug information display in development

### 4. Animation System
**Modular Animation Wrapper**
- Handles three distinct animation phases:
  - buildIn: entrance animations
  - buildMid: continuous/loop animations
  - buildOut: exit animations
- Currently supports:
  - Fade animations with customizable duration and delay
  - Slide animations with configurable distance and direction
- CSS-based implementationm using key-frames
- Easy extensibility for new animation types

### 5. Unit testing
- Implemented some basic unit testing, for the utility functions and for the ImageElement component, using Jest and React testing library

### Challenges and Solutions
1. **Element Rendering Accuracy**
- **Challenge**: Matching Creatopy's exact rendering behavior
- **Solution**:
  - Created element-specific rendering logic
  - Reverse engineering the html-next app minified js code in some cases, when it wasn't clear what role should a certain properties play. Example: text elements (quite complex nesting logic), image elements (to see where the images are loaded from), etc.

2. **Animation System Design**
- **Challenge**: Creating a flexible animation system, that's extensible for more animation types
- **Solution**:
  - Modular animation wrapper component
  - CSS-based animations for performance
  - Phase-based animation handling

3. **SSR Performance Optimization**
  - **Challenge**: SSR rendering is usually computationally expensive, especially for complex designs
  - **Solution**:
    - Used renderToStaticMarkup from react-dom/server to render the design to static HTML, instead of renderToString, since we don't need to deal with hydration on the client, in the current use case
    - Implemented Redis-based distributed cache for multi-instance deployments
    - Implemented in-memory fallback cache if Redis is unavailable
    - Browser caching through HTTP Cache-Control headers, for production only
  - **Result**: Subsequent requests for the same design are served instantly from cache

8. **Scalability**
   - **Challenge**: Ensuring the system can handle increased load
   - **Solution**:
    - Separated concerns into standalone services:
      1. JSON Fetch
      2. SSR rendering
      3. Caching
    - Redis is deployed as a separate container, so the app can scale independently of the caching layer
    - Deployed on Render.com which provides:
      - Automatic horizontal scaling
      - Load balancing across instances

### Future Improvements
With more time, I would add:

1. **Enhanced Element Support**
- Support for more element types (e.g. video, audio, etc.)
- Enhanced support for nested elements
- Support for loading fonts dynamically
- etc. Lots of stuff still missing in order to fully support what the Creatopy editor app can create

2. **Advanced Animation Features**
- More animation types (rotate, scale, etc.)
- Custom easing functions
- Animation presets

3. **Performance Optimizations**
  - CDN integration to cache HTML (e.g. Cloudflare)
  - Smart cache invalidation based on design updates
  - Pre-rendering mechanisms for popular designs
  - Dynamic caching times for popular designs, based on metrics (how hot the design is)

4. **Infrastructure Improvements**
  - Multi-region deployment (e.g. Fly.io)
  - Caching layer (Redis)

5. **Monitoring and Reliability**
   - Error tracking with e.g. Sentry
   - Performance monitoring
   - Automated alerts

6. **Developer Experience**
   - Better error messages
   - Logging service instead of console logs
   - Hot reload support
   - API documentation

7. **Testing and Quality**
   - Visual regression testing
   - Performance benchmarking
   - Integration test suite
   - E2E testing with e.g. Cypress

### Technical Stack
- **Frontend**:
  - React 18
  - TypeScript
  - Vite

- **Backend**:
  - Node.js
  - Express
  - React SSR

- **Data Layer**:
  - Fetch API
  - TypeScript types
  - JSON validation

- **Deployment**:
  - Render.com

The solution prioritizes:
- Performance through SSR and caching
- Accuracy in design rendering
- Maintainable and extensible codebase
- Type safety throughout the pipeline

This implementation provides a robust and efficient design rendering service with a strong focus on data reliability and type safety throughout the entire pipeline, while maintaining flexibility for future enhancements and optimizations.
