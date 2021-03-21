import { AppThunk } from "../../store"
import { newProject } from "./api"

export const saveProject = (
  projectName: string,
  thumbnail: string
): AppThunk => async (dispatch, getState) => {
  try {
    const response = await newProject(projectName, getState().strokes, thumbnail)
    console.log(response)
  } catch (err) {
    console.log(err.message)
  }
}
