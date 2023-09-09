import {selector} from "recoil";
import { courseState } from "../atoms/course";

export const coursePublishSelector = selector({
    key: 'coursePublishSelector',
    get: ({get}) => {
      const state = get(courseState);
      if (state.course) {
          return state.course.published;
      }
      return "";
    },
  })