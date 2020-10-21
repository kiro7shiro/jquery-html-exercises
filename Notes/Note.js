import { List } from './List.js'

class Note {
    constructor() {
        this.element = document.createElement('div')
        this.element.innerHTML = `<div class="w3-row">
                                    <div class="w3-third w3-container"></div>
                                    <div class="w3-third w3-container">top</div>
                                    <div class="w3-third w3-container"></div>
                                  </div>
                                  <div class="w3-row">
                                    <div class="w3-third w3-container">left</div>
                                    <div class="w3-third w3-container">center</div>
                                    <div class="w3-third w3-container">right</div>
                                  </div>
                                  <div class="w3-row">
                                    <div class="w3-third w3-container"></div>
                                    <div class="w3-third w3-container">bottom</div>
                                    <div class="w3-third w3-container"></div>
                                  </div>`
        
    }
}

export { Note }