import { toPng } from "html-to-image"
import { shareStatus, SHARE_STATUS } from "@/store/game.js";

const imgRef = document.getElementById("share-template");

export function handleShareClick() {

  requestAnimationFrame(() => {
    toPng(imgRef, { cacheBust: true,skipFonts: false })
      .then((dataUrl) => {
        share(dataUrl)
        shareStatus.value = SHARE_STATUS.NOT_SHARING;
      })
      .catch((err) => {
        console.log(err)
        shareStatus.value = SHARE_STATUS.NOT_SHARING;
      })
  })
}

async function share(dataUrl) {
  const base64 = await fetch(dataUrl)
  base64.blob().then((blob) => {
    const filesArray = [
      new File([blob], "Machipalabra.png", {
        type: "image/png",
      }),
    ]
    const shareData = {
      files: filesArray,
    }
    if (navigator.share) {
      navigator.share(shareData)
    } else {
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = "Machipalabra.png"
      link.click()
      link.remove()
    }
  })
}
