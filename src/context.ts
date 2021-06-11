let _this = {
  forceUpdate: () => {}
}
let _path = ''

export function getPathContext():any {
  return {
      path: _path,
      context: _this
  }
}

export function setPathContext({path, context}: any) {
  _path = path
  _this = context
}

