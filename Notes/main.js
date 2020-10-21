import { List } from './List.js'

// app starts here
let view = document.querySelector('body')
let list = new List('test', document.createElement('ul'))
view.append(list.element)
// test list append text 
list.append('test')
list.append('test2')
list.append('test3')
// test list remove item by index
list.remove(0)
// test list shiftDown
let down = document.createElement('li')
down.innerText = 'test4'
list.shiftDown(down)
// test list shiftUp
let up = document.createElement('li')
up.innerText = 'test5'
list.shiftUp(up)
// test list save and load
list.save()
let list2 = new List('test2', document.createElement('ul'))
list2.load('test')
// attach test instances to window for convience
window.list = list
window.list2 = list2