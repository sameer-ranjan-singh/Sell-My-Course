import * as React from "react";
import { useEffect, useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../config";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import SvgIcon from "@mui/material/SvgIcon";
import axios from "axios";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function PurchasedCourses({ courses, setCourses, backendRequest }) {
  [courses, setCourses] = useState([]);
  backendRequest = `${Base_URL}/user/purchasedCourses`;
  const navigate = useNavigate();

  const init = async () => {
    const response = await axios.get(backendRequest, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCourses(response.data.purchasedCourses);
  };

  useEffect(() => {
    init();
  }, []);
  if (courses.length === 0) {
    return (
      <>
        <Stack
          sx={{
            width: "100%",
            color: "grey.100",
          }}
          spacing={1}
        >
          <LinearProgress />
        </Stack>
      </>
    );
  }
  return (
    <>
      <div
        style={{
          position: "relative",
          margin: 60,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant=""
            style={{ color: "#CC5803", fontWeight: "bolder" }}
            onClick={() => {
              navigate("/courses");
            }}
          >
            <HomeIcon color="success" />
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap-reverse",
            justifyContent: "center",
            zIndex: 0,
          }}
        >
          <>
            {courses.map((course) => {
              return <Course course={course} key={course._id} />;
            })}
          </>
        </div>
      </div>
    </>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Color switch demo" } };

  return (
    <div style={{ padding: 20 }}>
      <Card
        onClick={() => {}}
        style={{
          width: 250,
          padding: "0px 0px 10px 0px",
          margin: 10,
          minHeight: 350,
          maxHeight: 350,
          boxShadow: "0px 0px 10px grey",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 40,
          border: "1px solid #93c422",
        }}
      >
        <div>
          <div style={{ display: "flex" }}>
            <img
              src={course.imageLink}
              alt="Course Image Unavailable"
              style={{
                width: 250,
                height: 150,
                boxShadow: "0px 5px 8px  black",
              }}
            />
          </div>
          <Typography
            style={{ backgroundColor: "#93c422" }}
            textAlign={"center"}
            variant="h6"
          >
            {course.title}
          </Typography>
          <Typography padding={"3px"} textAlign={"center"} variant="subtitle1">
            {course.description}
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center", margin: 5 }}>
          <Typography textAlign={"end"} variant="h6">
            <span
              style={{
                fontSize: "small",
                padding: 5,
                backgroundColor: "#bfd200",
                textAlign: "center",
              }}
            >
              Rs.{course.price}
            </span>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default PurchasedCourses;
