const STREAM_SELECTOR = '.stream-component';
const VIDEO_SELECTOR = 'video';
const INITIALIZE_RETRY_DELAY = 50;

function makeNodeFullscreen(streamNode) {
  streamNode.style.position = 'fixed';
  streamNode.style.top = 0;
  streamNode.style.bottom = 0;
  streamNode.style.right = 0;
  streamNode.style.left = 0;
  streamNode.style.zIndex = 9999999999999;
};

var observerConfig = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
};

function main(streamNode) {
  document.body.appendChild(streamNode);
  makeNodeFullscreen(streamNode);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => makeNodeFullscreen(streamNode));
  });
  document.getElementsByTagName(VIDEO_SELECTOR)[0].play();
  observer.observe(streamNode, observerConfig);
}

function initialize() {
  const streamNode = document.querySelector(STREAM_SELECTOR);

  if (!streamNode) {
    setTimeout(initialize, INITIALIZE_RETRY_DELAY);
  } else {
    main(streamNode);
  }
}

window.onload = () => initialize();
