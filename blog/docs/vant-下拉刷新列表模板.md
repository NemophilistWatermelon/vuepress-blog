```html
    <div class="fiexd-wrap">
    <div>
```

```js
    export default {
        name: 'refreshList',

        data() {
            return {
                loading: false,
                finished: false, 
                isLoading: false
            }
        }
    }
```


```css
.fiexd-wrap {
    position: fiexd;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0
    overflow: hidden
}

```