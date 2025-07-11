import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme,
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 20
  }
});

const Comments = ({ classes, scream: { comments = [] } }) => (
  <Grid container>
    {comments.map((comment, index) => {
      const { body, createdAt, userImage, userHandle } = comment;
      return (
        <React.Fragment key={createdAt + index}>
          <Grid item sm={12}>
            <Grid container>
              <Grid item sm={2}>
                <img
                  src={userImage}
                  alt="comment"
                  className={classes.commentImage}
                />
              </Grid>
              <Grid item sm={9}>
                <div className={classes.commentData}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variant="body1">{body}</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          {index !== comments.length - 1 && (
            <hr className={classes.visibleSeparator} />
          )}
        </React.Fragment>
      );
    })}
  </Grid>
);

Comments.propTypes = {
  scream: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  scream: state.data.scream
});

export default connect(mapStateToProps)(withStyles(styles)(Comments));
