# summernote-ext-highlight
Based on [Google code-prettify](https://github.com/google/code-prettify) the [summernote](https://github.com/summernote/summernote) code highlighting plugin

## Setup
 * Include summernote project script
 * Include [Font Awesome](http://fontawesome.io/)
 * Include the script tag below in your document
```HTML
<script src="http://your domain/summernote-ext-highlight.js"></script>
```

## Usage
 * Configuration summernote toolbar
```javascript
$('.summernote').summernote({
    height: 200,
    tabsize: 2,
    // close prettify Html
    prettifyHtml:false,
    toolbar:[
        // Add highlight plugin
        ['highlight', ['highlight']],
    ],
    lang:'zh-CN'
});
```
## Contacts
* Email: yanlong.hee#gmail.com
* Twitter: https://twitter.com/YanlongHe
* Website: https://notes.yanlong.me/

## License
summernote-ext-highlight may be freely distributed under the MIT license.
