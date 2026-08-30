export function createSpeechRecognizer(onResult, onError) {
  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognitionAPI) {
    return null // browser doesn't support it — caller should hide the mic button
  }

  const recognition = new SpeechRecognitionAPI()
  recognition.continuous = false
  recognition.interimResults = false
  recognition.lang = 'en-US'

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    onResult(transcript)
  }

  recognition.onerror = (event) => {
    onError(event.error)
  }

  return recognition
}