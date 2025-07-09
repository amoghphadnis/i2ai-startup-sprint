// src/theme.jsx
import { createSystem, defaultConfig } from '@chakra-ui/react';

const colors = {
  // primary palette
  primary:   { value: '#1e90ff' },           // var(--color-primary)
  secondary: { value: '#ffffff' },           // var(--color-secondary)
  muted:     { value: '#6c7a89' },           // var(--color-muted)
  bg:        { value: '#f8fafc' },           // var(--color-bg)
  dark:      { value: '#1a2233' },           // var(--color-dark)

  // extended accents
  'princeton-orange': { value: '#fb9824' },  // var(--princeton-orange)
  'indigo-dye':       { value: '#2c425c' },  // var(--indigo-dye)
  platinum:           { value: '#e3e3e3' },  // var(--platinum)
  black:              { value: '#000000' },  // var(--black)
  thistle:            { value: '#f9cfff' },  // var(--thistle)
  viridian:           { value: '#5b8266' },  // var(--viridian)
}

const radii = {
  md: { value: '1.2rem' },                    // var(--border-radius)
}

const shadows = {
  outline: { value: '0 0 0 3px rgba(30,144,255,0.6)' },
  xl:     { value: '0 4px 24px rgba(30,144,255,0.08)' },  // var(--shadow)
}

const semanticTokens = {
  // gradients
  gradients: {
    accent:       { value: 'linear-gradient(90deg, #1e90ff 0%, #6f6cff 100%)' },  // var(--gradient-accent)
    bottomAccent: { value: 'linear-gradient(90deg, #6f6cff 0%, #1e90ff 100%)' },  // var(--gradient-bottom)
    footer:       { value: 'linear-gradient(-135deg, #fb9824, #2c425c)' }         // var(--gradient-bottom-footer)
  }
}

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors,
      radii,
      shadows,
      gradients: semanticTokens.gradients,
    },
  },
});

export default system;
