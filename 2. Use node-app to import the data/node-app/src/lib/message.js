const message = require('print-message')

/**
 * Message management
 */
class Message {
    /**
     * Renders informative message
     *
     * @param text
     */
    static info (text) {
      text = Array.isArray(text) ? text : [text]
  
      message([
        ...text
      ], {color: 'blue', border: false, marginTop: 1})
    }
  
    /**
     * Renders error message
     *
     * @param text
     * @param logFile
     */
    static error (text, logFile = process.stderr) {
      text = Array.isArray(text) ? text : [text]
  
      // show trace if exception occurred
      if (text[0] instanceof Error) {
        text = text[0].stack.split('\n')
      }
  
      let logDetailsInfo = `Please check log file for details: ${logFile}`
  
      message([
        'ERROR',
        '',
        ...text,
        '',
        logDetailsInfo
      ], {borderColor: 'red', marginBottom: 1})
  
      process.exit(1)
    }
  
    /**
     * Render warning message
     *
     * @param text
     */
    static warning (text) {
      text = Array.isArray(text) ? text : [text]
  
      message([
        'WARNING:',
        ...text
      ], {color: 'yellow', border: false, marginTop: 1})
    }
  
    /**
     * Render block info message
     *
     * @param text
     * @param isLastMessage
     */
    static greeting (text, isLastMessage = false) {
      text = Array.isArray(text) ? text : [text]
  
      message([
        ...text
      ], Object.assign(isLastMessage ? {marginTop: 1} : {}, {borderColor: 'green', marginBottom: 1}))
    }
  }

module.exports = Message