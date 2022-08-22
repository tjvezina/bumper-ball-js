import { viewScale } from '../sketch.js';
const INPUT_EVENT_TYPES = [
    'mouseClicked',
    'mousePressed',
    'mouseReleased',
    'doubleClicked',
    'mouseMoved',
    'mouseDragged',
    'mouseWheel',
    'keyPressed',
    'keyReleased',
    'keyTyped',
];
const listenerSet = new Set();
const listenerMap = new Map();
const prevEventFuncMap = new Map();
const InputManager = {
    get mousePos() { return { x: mouseX / viewScale, y: mouseY / viewScale }; },
    get mouseDelta() { return { x: movedX / viewScale, y: movedY / viewScale }; },
    addListener(listener) {
        if (listenerSet.has(listener)) {
            return;
        }
        listenerSet.add(listener);
        for (const eventType of INPUT_EVENT_TYPES.filter(eventType => listener[eventType] !== undefined)) {
            if (!listenerMap.has(eventType)) {
                wrapEvent(eventType);
                listenerMap.set(eventType, []);
            }
            listenerMap.get(eventType).push(listener);
        }
    },
    removeListener(listener) {
        if (!listenerSet.has(listener)) {
            return;
        }
        listenerSet.delete(listener);
        for (const [eventType, listenerList] of [...listenerMap]) {
            if (listenerList.includes(listener)) {
                listenerList.splice(listenerList.indexOf(listener), 1);
                if (listenerList.length === 0) {
                    listenerMap.delete(eventType);
                    unwrapEvent(eventType);
                }
            }
        }
    },
    dispatch(eventType, event) {
        listenerMap.get(eventType).forEach(listener => listener[eventType].apply(listener, event));
    },
};
function wrapEvent(eventType) {
    const eventFunc = function (event) { InputManager.dispatch(eventType, event); };
    const prevEventFunc = globalThis[eventType];
    if (prevEventFunc === undefined) {
        globalThis[eventType] = eventFunc;
    }
    else {
        globalThis[eventType] = function (event) {
            eventFunc(event);
            prevEventFunc(event);
        };
        prevEventFuncMap.set(eventType, prevEventFunc);
    }
}
function unwrapEvent(eventType) {
    if (prevEventFuncMap.has(eventType)) {
        globalThis[eventType] = prevEventFuncMap.get(eventType);
        prevEventFuncMap.delete(eventType);
    }
    else {
        delete globalThis[eventType];
    }
}
export default InputManager;
//# sourceMappingURL=input-manager.js.map