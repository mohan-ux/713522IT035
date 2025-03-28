import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Box,
  Chip,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Favorite, Comment, Share, Bookmark } from '@mui/icons-material';
import { getRandomAvatar, getRandomImage } from '../services/api';

const PostCard = ({ post, comments = [], onCommentClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const avatarUrl = getRandomAvatar();
  const imageUrl = getRandomImage();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 600, 
        margin: '20px auto',
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar 
            src={avatarUrl} 
            alt={post.userName}
            sx={{ width: 48, height: 48 }}
          />
        }
        title={
          <Box>
            <Typography variant="subtitle1" component="div" fontWeight="bold">
              {post.userName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.createdAt)}
            </Typography>
          </Box>
        }
        subheader={
          <Box sx={{ mt: 1 }}>
            {post.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{ mr: 1, mb: 1 }}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        }
      />
      <CardMedia
        component="img"
        height={isMobile ? "200" : "300"}
        image={imageUrl}
        alt="Post image"
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {post.title}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            lineHeight: 1.6,
            mb: 2,
          }}
        >
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label="add to favorites" color="primary">
                <Favorite />
              </IconButton>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {post.likes}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <IconButton 
                aria-label="comments"
                onClick={() => onCommentClick(post.id)}
                color="primary"
              >
                <Comment />
              </IconButton>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {post.comments}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label="share" color="primary">
                <Share />
              </IconButton>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {post.shares}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <IconButton aria-label="bookmark" color="primary">
                <Bookmark />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </CardActions>
      {comments.length > 0 && (
        <Box 
          sx={{ 
            p: 2, 
            bgcolor: 'grey.50',
            borderTop: 1,
            borderColor: 'grey.200',
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="bold">
            Comments ({comments.length})
          </Typography>
          {comments.map((comment) => (
            <Box 
              key={comment.id} 
              sx={{ 
                mb: 2,
                p: 1.5,
                bgcolor: 'white',
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" component="span" fontWeight="bold">
                  {comment.email.split('@')[0]}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  {formatDate(comment.createdAt)}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                {comment.body}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" color="primary">
                  <Favorite fontSize="small" />
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  {comment.likes} likes
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
};

export default PostCard;