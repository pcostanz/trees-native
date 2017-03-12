const STREAM_SELECTOR = '.stream-component';
const HEADER_SELECTOR = '[class*="styles_shadow"]';
const CHAT_SELECTOR = '.chat-component';
const INITIALIZE_RETRY_DELAY = 50;

function makeNodeFullscreen(streamNode) {
  streamNode.style.position = 'fixed';
  streamNode.style.top = 0;
  streamNode.style.bottom = 0;
  streamNode.style.right = 0;
  streamNode.style.left = 0;
  streamNode.style.zIndex = 9999999999999;
};

function hideInterface() {
  const header = document.querySelector(HEADER_SELECTOR);
  const chat = document.querySelector(CHAT_SELECTOR);

  header.style.opacity = 0;
  header.style.zIndex = -1;
  chat.style.opacity = 0;
  chat.style.zIndex = -1;
};

var observerConfig = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
};

function main(streamNode) {
  hideInterface();
  makeNodeFullscreen(streamNode);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      hideInterface();
      makeNodeFullscreen(streamNode);
    });
  });
  observer.observe(document.body, observerConfig);
}

function initialize() {
  const streamNode = document.querySelector(STREAM_SELECTOR);

  if (!streamNode) {
    setTimeout(initialize, INITIALIZE_RETRY_DELAY);
  } else {
    main(streamNode);
  }
}

initialize();
// window.addEventListener('load', initialize);
