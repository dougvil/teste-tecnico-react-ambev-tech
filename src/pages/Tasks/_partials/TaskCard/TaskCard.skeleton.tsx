import { Card, CardActions, CardContent, Skeleton, Stack } from '@mui/material';
import { cardActionsStyles, cardContentStyles, getCardStyles } from './TaskCard.styles';

export const TaskCardSkeleton = () => {
  return (
    <Card sx={{ ...getCardStyles(false), borderColor: 'transparent' }}>
      <CardContent sx={cardContentStyles}>
        <Stack spacing={1.5}>
          <Skeleton
            variant='text'
            width='80%'
            height={32}
          />
          <Skeleton
            variant='text'
            width='100%'
            height={20}
          />
          <Skeleton
            variant='text'
            width='90%'
            height={20}
          />
        </Stack>
      </CardContent>
      <CardActions sx={cardActionsStyles}>
        <Skeleton
          variant='circular'
          width={36}
          height={36}
          sx={{ mr: 'auto' }}
        />
        <Skeleton
          variant='circular'
          width={36}
          height={36}
        />
        <Skeleton
          variant='circular'
          width={36}
          height={36}
        />
      </CardActions>
    </Card>
  );
};
