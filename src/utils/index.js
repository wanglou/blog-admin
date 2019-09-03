import { Message } from 'element-ui'

export function error (message) {
  Message.error({
    message
  })
}

export function success (message) {
  Message.success({
    message
  })
}
