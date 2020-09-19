const clipboard = require('electron-clipboard-extended')
 
clipboard
.on('text-changed', () => {
    let currentText = clipboard.readText()
})
.once('text-changed', () => {
    console.log('TRIGGERED ONLY ONCE')
})
.on('image-changed', () => {
    let currentIMage = clipboard.readImage()
})
.startWatching();
 
clipboard.off('text-changed');
 
clipboard.stopWatching();