import event from './event'
import { setPathContext, getPathContext} from './context'

type TaroComponent = {
  prototype: {
    componentWillMount: () => void,
    componentDidShow: () => void
  },
 
}

export function observer(component: TaroComponent) {
  const target = component.prototype;
  const _componentWillMount = target.componentWillMount;
  const _componentDidShow = target.componentDidShow;
  target.componentWillMount = function () {
    if (this.$router.path) {
      setPathContext({
        path: this.$router.path, 
        context: this
      });
    }
    _componentWillMount && _componentWillMount.call(this);
  };

  target.componentDidShow = function () {
    if (this.$router.path && getPathContext().path !== this.$router.path) {
      setPathContext({
        path: this.$router.path, 
        context: this
      });
    }
    _componentDidShow && _componentDidShow.call(this);
  };
}


export function createTrox(model: object): any {
  return new Proxy<any>(model, {
    get(target, key, receiver) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        return createTrox(target[key])
      }
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      event.enqueue(key)
      setTimeout(() => {
        const _len = event.length()
        for(let i = 0; i< _len; i++) {
          event.dequeue(() => {
            getPathContext().context.forceUpdate()
          })
        }
      },0)
      return Reflect.set(target, key, value, receiver)
    }
  });
}
