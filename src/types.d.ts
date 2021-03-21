export type RootState = {
  currentStroke: Stroke
  strokes: Stroke[]
  historyIndex: number
  modalState: ModalState
  projectsList: {
    error: string
    pending: boolean
    projects: Project[]
  }
}

export type Stroke = {
  points: Point[]
  color: string
}

export type Point = {
  x: number
  y: number
}

export type ModalState = {
  isShown: boolean
  modalName: string | null
}

export type Project = {
  image: string;
  name: string;
  id: string
}
