import { AppThunk } from "../../store"
import { Project } from "../../types"
import {
  getProjectsListSuccess,
  getProjectsListFailed
} from "./slice"
import { fetchProjectsList } from "./api"

export const getProjectsList = (): AppThunk => async (dispatch) => {
  try {
    const projectsList: Project[] = await fetchProjectsList()
    dispatch(getProjectsListSuccess(projectsList))
  } catch (err) {
    dispatch(getProjectsListFailed(err.toString()))
  }
}
