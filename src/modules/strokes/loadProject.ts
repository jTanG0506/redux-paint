import { AppThunk } from "../../store";
import { getProject } from "./api";
import { setStrokes } from "./slice";

export const loadProject = (projectId: string): AppThunk => async (
  dispatch) => {
  try {
    const { project } = await getProject(projectId)
    dispatch(setStrokes(project.strokes));
  }
  catch (err) {
    console.log(err.message);
  }
};
