import { makeStyles } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
    
  }
}));

export const LetterAvatars = ({initial}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar className={classes.orange}>{initial}</Avatar>
    </div>
  );
}