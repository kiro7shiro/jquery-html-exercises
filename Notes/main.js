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
        this.editButton = undefined
        this.inputBox = undefined
        this.element = document.createElement('li')
        // wrapping the text inside a <div> element
        // will make it easier to add and remove the content and buttons
        this.element.innerHTML = '<div>' + text + '</div>'
        this.element.addEventListener('mouseenter', this.mouseEnter.bind(this))
        this.element.addEventListener('mouseleave', this.mouseLeave.bind(this))
    }
    mouseLeave(event) {
        // remove, delete and edit button
        // setting buttons explicitly to undefined because
        // we check here if there are present
        // if we don't reset after the check the vars will remain set
        // so if we check again, the new buttons won't be removed
        if(this.deleteButton) {
            this.deleteButton.remove()
            this.deleteButton = undefined
        }
        if(this.editButton) {
            this.editButton.remove()
            this.editButton = undefined
        }
    }
    mouseEnter(event) {
        // create and show delete and edit button 
        this.deleteButton = document.createElement('button')
        this.editButton = document.createElement('button')
        this.deleteButton.innerHTML = 'del'
        this.editButton.innerHTML = 'edit'
        // setup event listeners for buttons
        this.deleteButton.addEventListener('click', event => this.element.remove())
        this.editButton.addEventListener('click', event => {
            this.inputBox = document.createElement('input')
            this.inputBox.value = this.element.firstElementChild.textContent
            this.inputBox.addEventListener('mouseleave', event => {
                this.element.innerHTML = '<div>' + this.inputBox.value + '</div>'
                this.inputBox.replaceWith(this.element)
            })
            this.inputBox.addEventListener('keyup', event => {
                if(event.key === 'Enter') {
                    this.element.innerHTML = '<div>' + this.inputBox.value + '</div>'
                    this.inputBox.replaceWith(this.element)
                }
            })
            this.element.replaceWith(this.inputBox)
            this.inputBox.focus()
        })
        // append new elements
        this.element.append(this.deleteButton)
        this.element.append(this.editButton)
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
        this.addButton = undefined
        this.inputBox = undefined
        this.element = element
        this.element.classList.add('list')
        this.element.addEventListener('mouseenter', this.mouseEnter.bind(this))
        this.element.addEventListener('mouseleave', this.mouseLeave.bind(this))
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
    mouseLeave(event) {
        if(this.addButton) {
            this.addButton.remove()
            this.addButton = undefined
        }
        if(this.inputBox) {
            this.inputBox.remove()
            this.inputBox = undefined
        }
    }
    mouseEnter(event) {
        if (!this.addButton) {
            this.addButton = document.createElement('button')
            this.addButton.innerHTML = 'add'
            this.addButton.addEventListener('click', event => {
                this.inputBox = document.createElement('input')
                this.inputBox.addEventListener('keyup', event => {
                    if(event.key === 'Enter') {
                        this.append(this.inputBox.value)
                        this.mouseLeave()
                    }
                })
                this.element.prepend(this.inputBox)
                this.inputBox.focus()
            })
            this.element.prepend(this.addButton)
        }
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
        this.prepend(element.innerHTML)
        this.element.lastElementChild.remove()
    }
    shiftUp(element) {
        this.append(element.innerHTML)
        this.element.firstElementChild.remove()
    }
    toArray() {
        const result = []
        const self = Array.from(this.items)
        self.forEach(item => result.push(item.innerHTML))
        return result
    }
}

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