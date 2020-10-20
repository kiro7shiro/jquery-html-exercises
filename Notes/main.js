/**
 * Represents a listitem 
 * @class ListItem
 */
class ListItem {
    /**
     * Creates an instance of ListItem.
     * @param {String} text
     * @memberof ListItem
     */
    constructor(text) {
        if(!text) throw new Error('text must be given!')
        this.deleteButton = undefined
        this.element = document.createElement('li')
        this.element.textContent = text
        this.element.addEventListener('mouseenter', this.mouseEnter.bind(this))
        this.element.addEventListener('mouseleave', this.mouseLeave.bind(this))
    }
    mouseLeave(event) {
        if(this.deleteButton) this.deleteButton.remove()
    }
    mouseEnter(event) {
        this.deleteButton = document.createElement('button')
        this.deleteButton.textContent = 'del'
        this.deleteButton.addEventListener('click', event => this.element.remove())
        this.element.append(this.deleteButton)
    }
}

/**
 * Represents a list of notes
 * @class List
 */
class List {
    /**
     * Creates an instance of List.
     * @param {String} name
     * @param {HTMLElement} element an unordered list
     * @memberof List
     */
    constructor(name, element) {
        if(!element) throw new Error('element must be given!')
        this.element = element
        this.name = name
    }
    get items() {
        return this.element.children
    }
    append(text) {
        const item = new ListItem(text)
        this.element.append(item.element)
    }
    load(name) {
        const saved = localStorage.getItem(name).split(',')
        saved.forEach(item => this.append(item))
    }
    prepend(text) {
        const item = new ListItem(text)
        this.element.prepend(item.element)
    }
    remove(index) {
        this.items[index].remove()
    }
    save() {
        localStorage.setItem(this.name, this.toArray())
    }
    shiftDown(element) {
        this.prepend(element.textContent)
        this.element.lastElementChild.remove()
    }
    shiftUp(element) {
        this.append(element.textContent)
        this.element.firstElementChild.remove()
    }
    toArray() {
        const result = []
        const self = Array.from(this.items)
        self.forEach(item => result.push(item.textContent))
        return result
    }
}

let view = document.querySelector('body')
let list = new List('test', document.createElement('ul'))

view.append(list.element)

list.append('test')
list.append('test2')
list.append('test3')

list.remove(0)

let down = document.createElement('li')
down.textContent = 'test4'

list.shiftDown(down)

let up = document.createElement('li')
up.textContent = 'test5'

list.shiftUp(up)

console.log(list.toArray())
list.save()

let list2 = new List('test2', document.createElement('ul'))
list2.load('test')

window.list = list
window.list2 = list2