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
            // setup event listeners for input box
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
            // show the input box
            this.element.replaceWith(this.inputBox)
            this.inputBox.focus()
        })
        // append new elements
        this.element.append(this.deleteButton)
        this.element.append(this.editButton)
    }
}

export { ListItem }