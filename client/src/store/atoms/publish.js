import { atom, useRecoilValue } from "recoil";
import { coursePublish } from "../selectors/course";

export const coursePublishState = atom({
    key: 'coursePublishState',
    default: {
        checkPublish: publishCheck
    }
})