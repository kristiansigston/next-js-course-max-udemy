import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { useContext } from "react";
import NotificationContext from "../../store/contexts/notificationContext";

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState();
  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is being saved into the database..",
      status: "pending",
    });
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            throw new Error(data.message || "Something went wrong");
          });
        }
        return response.json();
      })
      .then(() => {
        notificationCtx.showNotification({
          title: "Success",
          message: "Your comment was saved",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Sending comment...",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading ... </p>}
    </section>
  );
}

export default Comments;
