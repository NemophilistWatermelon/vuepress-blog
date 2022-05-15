# vite 快捷查询语法
## Props (TypeScript 写法)
#### 有默认值
```ts
// 有默认值传递写法 
interface Props {
  msg?: string,
  content?: string
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  content: '默认文本'
})

```
#### 无默认值
```ts

defineProps<{
   msg: string,
   content: string
}>()

```

### Props (JavaScript 写法)
#### 有默认值
```js
// 有默认值传递写法 
// 有默认值传递写法 
defineProps({
   msg: String,
   content: {
		type: String,
		default: '1212'
	 }
})

```


## Emit 事件 (TypeScript 写法)
#### 有默认值
```ts
const emit = defineEmits<{
  (e: ‘click’, num:number): void,
  (e: ‘wock’, num:number): void
}>()

const clickHere = (_:any):void => {
  emit(‘wock’, 12112)
}

```
```html	
	子组件
	<button @click='clickHere'/>

	父组件
	<Child @wock='xxxEventName'>
```
