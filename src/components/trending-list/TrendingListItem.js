import React, {Component} from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import ListItem from "@mui/material/ListItem/ListItem";
import {Link} from "react-router-dom";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles";
import Typography from "@mui/material/Typography/Typography";
import moment from "moment";
import {AppRoutes} from "../../routes";

class TrendingListItem extends Component {

  render() {
    const {classes, title, subtitle, imageUrl, categories} = this.props;
    let defaultImageUrl = "unknown.png";
    if (categories.includes("PERSON")) {
      defaultImageUrl = "avatar.png"
    } else if (categories.includes("ORGANIZATION")) {
      defaultImageUrl = "organization.png"
    }

    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Link className={classes.itemLink} to={AppRoutes.entity + title}>
            <Avatar alt={title} src={imageUrl === "" ? defaultImageUrl : imageUrl}/>
          </Link>
        </ListItemAvatar>
        <Link className={classes.itemLink} to={AppRoutes.entity + title}>
          <Typography className={classes.trendingItemTitle} variant='h6'><span
            className={"news-title"}>{title}</span></Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {moment(subtitle, 'DD  MMM YYYY h:mm A').fromNow()}
          </Typography>
        </Link>
      </ListItem>
    )
  }
}

export default withStyles(Styles)(TrendingListItem);
