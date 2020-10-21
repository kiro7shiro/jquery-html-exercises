import { List } from './List.js'

class Note {
    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add('w3-border', 'w3-padding')
        // setting up a 3x3 grid to host the note lists
        // we leave four cells unoccoupied for easier handling
        // we keep top, right, bottom, left, center as our areas
        // note the use of >>>template strings<<< to write the new html in one go
        this.element.innerHTML = `<div class="w3-row">
                                    <div class="w3-third w3-container"></div>
                                    <div class="w3-third w3-container" id="top">
                                        <h1>top</h1>
                                    </div>
                                    <div class="w3-third w3-container"></div>
                                  </div>
                                  <div class="w3-row">
                                    <div class="w3-third w3-container" id="left">
                                        <h1>left</h1>
                                    </div>
                                    <div class="w3-third w3-container" id="center">
                                        <h1>center</h1>
                                    </div>
                                    <div class="w3-third w3-container" id="right">
                                        <h1>right</h1>
                                    </div>
                                  </div>
                                  <div class="w3-row">
                                    <div class="w3-third w3-container"></div>
                                    <div class="w3-third w3-container" id="bottom">
                                        <h1>bottom</h1>
                                    </div>
                                    <div class="w3-third w3-container"></div>
                                  </div>`
        // saving the areas for easy access
        this.top = {
            element : this.element.querySelector('#top'),
            list : new List('top')
        }
        this.right = {
            element : this.element.querySelector('#right'),
            list : new List('right')
        }
        this.bottom = {
            element : this.element.querySelector('#bottom'),
            list : new List('bottom')
        }
        this.left = {
            element : this.element.querySelector('#left'),
            list : new List('left')
        }
        this.center = {
            element : this.element.querySelector('#center'),
            list : new List('center')
        }
        // adding the lists into the areas
        this.top.element.append(this.top.list.element)
        this.right.element.append(this.right.list.element)
        this.bottom.element.append(this.bottom.list.element)
        this.left.element.append(this.left.list.element)
        this.center.element.append(this.center.list.element)
    }
}

export { Note }