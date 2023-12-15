"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOK = void 0;
const ROOK = (innerColor, outerColor) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="54" viewBox="0 0 52 54" fill="none">
  <path d="M19.1146 3.75C19.6345 3.75 20.1219 3.89609 20.5417 4.15135C20.9615 3.89609 21.4489 3.75 21.9687 3.75H29.8177C30.3376 3.75 30.825 3.89609 31.2448 4.15135C31.6646 3.89609 32.152 3.75 32.6719 3.75H39.8073C41.3836 3.75 42.6615 5.09315 42.6615 6.75V13.5C42.6615 14.4443 42.2385 15.3334 41.5198 15.9L37.1157 19.3718L38.3628 31.1687C38.6929 34.2919 40.0759 35.8765 42.0906 38.7C42.4612 39.2193 42.6615 39.8509 42.6615 40.5V46.5C42.6615 48.1569 41.3836 49.5 39.8073 49.5H11.9792C10.4029 49.5 9.125 48.1569 9.125 46.5V40.5C9.125 39.8509 9.3253 39.2193 9.69583 38.7C11.7105 35.8765 13.0936 34.2919 13.4237 31.1687L14.6708 19.3718L10.2667 15.9C9.54797 15.3334 9.125 14.4443 9.125 13.5V6.75C9.125 5.09315 10.4029 3.75 11.9792 3.75H19.1146Z" fill="${outerColor}"/>
  <path d="M11.9792 6.75H19.1146V11.25H21.9687V6.75H29.8177V11.25H32.6719V6.75H39.8073V13.5L34.0989 18L35.526 31.5H16.2604L17.6875 18L11.9792 13.5V6.75Z" fill="${innerColor}"/>
  <path d="M16.2604 34.5H35.526L39.8073 40.5V46.5H11.9792V40.5L16.2604 34.5Z" fill="${innerColor}"/>
</svg>
`;
exports.ROOK = ROOK;
