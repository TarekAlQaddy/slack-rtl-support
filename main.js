const messageBodySelectors = '.c-message__body:not([dir]), .message_body:not([dir])'
const mainContainerSelector = '.c-virtual_list__scroll_container'
const threadsContinerSelector = '#convo_tab'
const inputsSelectors = '.ql-editor'

function addRTLForNewMessages (container) {
  let newNodes
  if (container) {
    newNodes = container.querySelectorAll(messageBodySelectors)
  }
  Array.prototype.forEach.call(newNodes, child => {
    applyRTL(child)
  })
}

function addRTLForInputs (inputs) {
  Array.prototype.forEach.call(inputs, input => applyRTL(input))
}

function applyRTL (node) {
  node.setAttribute('dir', 'auto')
  node.style.textAlign = 'left'
}

function startObservingContainers () {
  let mainContainer = document.querySelector(mainContainerSelector)
  let threadsContainer = document.querySelector(threadsContinerSelector)
  let inputs = document.querySelectorAll(inputsSelectors)
  if (mainContainer && threadsContainer && inputs.length > 0) {
    clearInterval(interval)
    let mainObserver = new MutationObserver(addRTLForNewMessages.bind(null, mainContainer))
    let threadsObserver = new MutationObserver(addRTLForNewMessages.bind(null, threadsContainer))
    let options =  {
      childList: true,
      subtree: true,
      characterData: true
    }
    mainObserver.observe(mainContainer, options)
    threadsObserver.observe(threadsContainer, options)
    addRTLForNewMessages(mainContainer)
    addRTLForInputs(inputs)
  }
}

let interval = setInterval(startObservingContainers, 1000)
startObservingContainers()
