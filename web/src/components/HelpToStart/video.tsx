import React, { FC, useRef } from 'react'
import * as s from './HelpToStart.css'

interface Props {
  name: string
}

const Video: FC<Props> = ({ name }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFullScreen = () => {
    const { current: videoNode } = videoRef

    if (!videoNode) {
      return null
    }

    if (videoNode.requestFullscreen) {
      return videoNode.requestFullscreen()
    }

    if (videoNode.mozRequestFullScreen) { /* Firefox */
      return videoNode.mozRequestFullScreen()
    }

    if (videoNode.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      return videoNode.webkitRequestFullscreen()
    }

    if (videoNode.msRequestFullscreen) { /* IE/Edge */
      return videoNode.msRequestFullscreen()
    }
  }

  return (
    <div className={s.HelpToStart__video}>
      <video
        ref={videoRef}
        autoPlay
        loop
      >
        <source
          src={`/video/${name}.mp4`}
          type="video/mp4"
        />
        <source
          src={`/video/${name}.ogg`}
          type="video/ogg"
        />
        Your browser does not support the video tag.
      </video>

      <button
        className={s.HelpToStart__fullscreen}
        onClick={handleFullScreen}
      />
    </div>
  )
}

export default Video
