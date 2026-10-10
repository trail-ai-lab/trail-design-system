import * as React from "react"

/**
 * A stand-in microphone stream for stories: a voice-range tone whose volume
 * pulses like speech, so LiveWaveform has levels to draw without a real mic.
 * Silent (it never reaches the speakers). Browsers may hold the audio
 * context until the page is clicked.
 */
export function useSimulatedAudioStream() {
  const [stream, setStream] = React.useState<MediaStream | null>(null)

  React.useEffect(() => {
    const context = new AudioContext()
    const tone = context.createOscillator()
    tone.type = "triangle"
    tone.frequency.value = 180
    const volume = context.createGain()
    volume.gain.value = 0.12
    // Two slow wobbles on the volume read as syllables and pauses.
    const syllables = context.createOscillator()
    syllables.frequency.value = 3.2
    const syllableDepth = context.createGain()
    syllableDepth.gain.value = 0.08
    const phrases = context.createOscillator()
    phrases.frequency.value = 0.45
    const phraseDepth = context.createGain()
    phraseDepth.gain.value = 0.1
    syllables.connect(syllableDepth).connect(volume.gain)
    phrases.connect(phraseDepth).connect(volume.gain)

    const destination = context.createMediaStreamDestination()
    tone.connect(volume).connect(destination)
    tone.start()
    syllables.start()
    phrases.start()
    let closed = false
    // Hand the stream over once the audio graph is up (resume() settles
    // even while the browser keeps the context suspended).
    void context.resume().finally(() => {
      if (!closed) setStream(destination.stream)
    })

    const resume = () => void context.resume()
    window.addEventListener("pointerdown", resume)
    return () => {
      closed = true
      window.removeEventListener("pointerdown", resume)
      void context.close()
    }
  }, [])

  return stream
}

/** The real microphone, once the viewer asks for it; tracks stop on unmount. */
export function useMicrophoneStream() {
  const [stream, setStream] = React.useState<MediaStream | null>(null)
  const [error, setError] = React.useState<string>()

  React.useEffect(
    () => () => stream?.getTracks().forEach((track) => track.stop()),
    [stream]
  )

  const request = async () => {
    try {
      setStream(await navigator.mediaDevices.getUserMedia({ audio: true }))
      setError(undefined)
    } catch {
      setError("Microphone access was blocked.")
    }
  }

  return { stream, error, request }
}
