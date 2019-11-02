import React from 'react';
import Card from '@material-ui/core/Card';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line react/prop-types
const Item = ({ content, keywords }) => {
  let keywordsSplit = 'Теги: ';
  keywords.forEach(keyword => (keywordsSplit += keyword + ' '));
  return (
    <Card
      style={{
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
      }}
    >
      <ListItemText
        primary={keywordsSplit}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {content}
            </Typography>
          </React.Fragment>
        }
      />
    </Card>
  );
};
export default Item;
