declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

interface ModelViewerJSX {
  src?: string;
  alt?: string;
  'auto-rotate'?: boolean;
  'camera-controls'?: boolean;
  'touch-action'?: string;
  'disable-zoom'?: boolean;
  ar?: boolean;
  'ar-modes'?: string;
  'auto-rotate-delay'?: number;
  'rotation-per-second'?: string;
  style?: React.CSSProperties;
  loading?: 'auto' | 'lazy' | 'eager';
  reveal?: 'auto' | 'manual';
  'interaction-prompt'?: 'auto' | 'none';
  'interaction-prompt-threshold'?: number;
  poster?: string;
  'seamless-poster'?: boolean;
}

