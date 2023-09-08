let Base_URL;

if (process.env.NODE_ENV === "development") {
  Base_URL = "http://localhost:3000";
} else {
  Base_URL = "https://sell-my-course.onrender.com";
}

export { Base_URL };
