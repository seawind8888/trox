# Trox

轻量级Taro状态管理工具

## 安装
```
npm i trox --save
```

## 使用
```
import { createTrox, observer } from 'trox'
...
const model = createTarox({
  name: 'test'
})
...
@observer
export default class Index extends Component {
    ...
    handleOnClick = () => {
        model.name = 'test2'
    }
    ...
    render() {
        ...
        <View>{model.name}</View>
    }
}


```
