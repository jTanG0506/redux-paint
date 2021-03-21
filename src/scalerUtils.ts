type ScalerArgs = {
  file: Blob
  scale: number
}

export function getBase64Thumbnail({
  file,
  scale = 0.1
}: ScalerArgs): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const el = document.createElement("canvas")
        let w = (el.width = img.width * scale)
        let h = (el.height = img.height * scale)
        const ctx = el.getContext("2d")
        if (!ctx) {
          return
        }
        ctx.drawImage(img, 0, 0, w, h)
        return res(el.toDataURL())
      }
      reader.onerror = (e) => {
        rej(e.toString())
      }
      img.src = e?.target?.result as string
    }
  })
}
