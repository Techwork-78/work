import axios from "axios";

export const KEY1 = "AIzaSyAxT_UiBycemc6IAcKBrhvl94ixL2GkfVg";
export const KEY2 = "AIzaSyAwPpPYUJLAMLu85AD0sLbJ-3_ty3r0SbU";
export const KEY4 = "AIzaSyBmffsJlVLeprlrZcw5S8f1GUjokalbfQM";
export const KEY = "AIzaSyCnnR32_dyNHO8u1qtOAIncabUjb3i4zL4";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 3,
    key: KEY,
  },
});
