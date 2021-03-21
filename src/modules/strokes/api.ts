import { Stroke } from "../../types"

export const newProject = (
  name: string,
  strokes: Stroke[],
  image: string
) =>
  fetch("http://localhost:4000/projects/new", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      strokes,
      image
    })
  }).then((res) => res.json())

export const getProject = (projectId: string) =>
  fetch(`http://localhost:4000/projects/${projectId}`).then((res) =>
    res.json()
  )
