import type { SxProps, Theme } from '@mui/material';

export const getCardStyles = (isCompleted: boolean): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100%',
  minHeight: '160px',
  transition: 'all 0.3s ease',
  borderLeft: 4,
  borderLeftColor: isCompleted ? 'success.main' : 'primary.main',
  opacity: isCompleted ? 0.85 : 1,
  '&:hover': {
    boxShadow: 2,
    backgroundColor: 'grey.50',
  },
});

export const titleStyles: SxProps<Theme> = {
  fontWeight: 600,
  lineHeight: 1.2,
  minHeight: '2.4em',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const descriptionStyles: SxProps<Theme> = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginTop: 0,
};

export const cardContentStyles: SxProps<Theme> = {
  flex: 1,
  paddingBottom: '8px !important',
};

export const cardActionsStyles: SxProps<Theme> = {
  justifyContent: 'flex-end',
};

export const deleteButtonStyles: SxProps<Theme> = {
  mr: 'auto',
  '&:hover': {
    color: 'error.main',
  },
};

export const getCompleteButtonStyles = (isCompleted: boolean): SxProps<Theme> => ({
  backgroundColor: isCompleted ? 'success.light' : 'grey.200',
  color: isCompleted ? 'success.main' : 'text.secondary',
  padding: '8px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: isCompleted ? 'success.main' : 'success.light',
    color: isCompleted ? 'white' : 'success.main',
    transform: 'scale(1.1)',
    boxShadow: isCompleted ? 1 : 2,
  },
});
