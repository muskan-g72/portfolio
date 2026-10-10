import { useSyncExternalStore } from "react";

type Listener = () => void;

type ScrollScene = {
  hero: number;
  experience: number;
  handoff: number;
  works: number;
  activeProject: number;
  is3DActive: boolean;
};

const state: ScrollScene = {
  hero: 0,
  experience: 0,
  handoff: 0,
  works: 0,
  activeProject: 0,
  is3DActive: false,
};

const listeners = new Set<Listener>();

export function setScrollScene(partial: Partial<ScrollScene>) {
  Object.assign(state, partial);
  listeners.forEach((listener) => listener());
}

export function getScrollScene() {
  return state;
}

export function subscribeScrollScene(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function use3DActive() {
  return useSyncExternalStore(
    subscribeScrollScene,
    () => state.is3DActive,
    () => false,
  );
}
