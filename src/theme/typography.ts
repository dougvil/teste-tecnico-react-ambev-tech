import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import type { ThemeOptions } from '@mui/material/styles';

export const typography: ThemeOptions['typography'] = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',

  // Display - For hero sections and landing pages
  h1: {
    fontSize: '3rem', // 48px
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: '#1A202C',
  },

  // Page Title - Main page headings
  h2: {
    fontSize: '2.25rem', // 36px
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.015em',
    color: '#1A202C',
  },

  // Section Title - Major sections
  h3: {
    fontSize: '1.875rem', // 30px
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    color: '#2D3748',
  },

  // Subsection Title
  h4: {
    fontSize: '1.5rem', // 24px
    fontWeight: 600,
    lineHeight: 1.35,
    letterSpacing: '-0.005em',
    color: '#2D3748',
  },

  // Card/Component Title
  h5: {
    fontSize: '1.25rem', // 20px
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em',
    color: '#2D3748',
  },

  // Small Heading
  h6: {
    fontSize: '1.125rem', // 18px
    fontWeight: 600,
    lineHeight: 1.45,
    letterSpacing: '0em',
    color: '#4A5568',
  },

  // Primary Body Text - Default paragraph text
  body1: {
    fontSize: '1rem', // 16px
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '0.01em',
    color: '#4A5568',
  },

  // Secondary Body Text - Smaller content
  body2: {
    fontSize: '0.875rem', // 14px
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    color: '#718096',
  },

  // Lead Paragraph - Emphasized introductory text
  subtitle1: {
    fontSize: '1.125rem', // 18px
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '0.005em',
    color: '#2D3748',
  },

  // Supporting Text - Descriptions and metadata
  subtitle2: {
    fontSize: '0.875rem', // 14px
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    color: '#718096',
  },

  // Button Text - Consistent across all button sizes
  button: {
    fontSize: '0.9375rem', // 15px
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.02em',
    textTransform: 'none',
  },

  // Caption - Helper text, labels, timestamps
  caption: {
    fontSize: '0.75rem', // 12px
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.02em',
    color: '#A0AEC0',
  },

  // Overline - Labels, tags, categories
  overline: {
    fontSize: '0.6875rem', // 11px
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#718096',
  },
};
