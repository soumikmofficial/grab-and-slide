import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles<any>()((theme, { isGrabbing }) => ({
  swiperContainer: {
    background: "black",
    padding: "30px 20px",
    width: "400px",
    // width: props.width ? props.width : "400px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    overflow: "scroll",
    "&::-webkit-scrollbar": { display: "none" },
    cursor: isGrabbing ? "grabbing" : "grab",
  },

  slide: {
    border: "1px solid red",
    width: "fit-content",
    padding: "10px 20px",
    borderRadius: "15px",
  },
}));
