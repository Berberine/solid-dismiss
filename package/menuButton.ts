import { TLocalState } from "./localState";
import { removeOutsideFocusEvents } from "./outside";
import { getNextTabbableElement } from "./utils";

export const onClickMenuButton = (state: TLocalState) => {
  const {
    menuButtonBlurTimeoutId,
    menuBtnEl,
    closeWhenMenuButtonIsClicked,
    setOpen,
    open,
  } = state;

  clearTimeout(state.containerFocusTimeoutId!);
  clearTimeout(menuButtonBlurTimeoutId!);
  menuBtnEl!.focus();
  state.containerFocusTimeoutId = null;

  if (!closeWhenMenuButtonIsClicked) {
    setOpen(true);
    return;
  }

  setOpen(!open());
};

export const onBlurMenuButton = (state: TLocalState, e: FocusEvent) => {
  const { onClickDocumentRef, containerEl, overlay, setOpen, open, setFocus } =
    state;

  if (!open()) {
    setFocus && setFocus(false);
  }

  if (state.menuBtnKeyupTabFired) {
    state.menuBtnKeyupTabFired = false;
    return;
  }

  if (!e.relatedTarget) {
    if (!overlay) {
      document.addEventListener("click", onClickDocumentRef, { once: true });
    }
    return;
  }

  removeOutsideFocusEvents(state);

  if (!containerEl) return;
  if (containerEl.contains(e.relatedTarget as HTMLElement)) return;

  const run = () => {
    setOpen(false);
    if (setFocus) {
      setFocus(false);
    }
  };

  state.menuButtonBlurTimeoutId = window.setTimeout(run);
};

export const onKeydownMenuButton = (state: TLocalState, e: KeyboardEvent) => {
  const {
    focusSentinelFirstEl,
    containerEl,
    menuBtnEl,
    setOpen,
    open,
    onKeydownMenuButtonRef,
    onBlurMenuButtonRef,
  } = state;

  if (!open()) return;
  if (e.key === "Tab" && e.shiftKey) {
    setOpen(false);
    state.menuBtnKeyupTabFired = true;
    menuBtnEl!.removeEventListener("keydown", onKeydownMenuButtonRef);
    menuBtnEl!.removeEventListener("blur", onBlurMenuButtonRef);
    return;
  }
  if (e.key !== "Tab") return;
  state.menuBtnKeyupTabFired = true;
  e.preventDefault();
  const el = getNextTabbableElement({ from: focusSentinelFirstEl! });
  if (el) {
    el.focus();
  } else {
    containerEl!.focus();
  }
  menuBtnEl!.removeEventListener("keydown", onKeydownMenuButtonRef);
  menuBtnEl!.removeEventListener("blur", onBlurMenuButtonRef);
};

export const onFocusMenuButton = (state: TLocalState) => {
  const {
    menuBtnEl,
    closeWhenMenuButtonIsTabbed,
    containerFocusTimeoutId,
    onKeydownMenuButtonRef,
    onBlurMenuButtonRef,
    setFocus,
  } = state;

  setFocus && setFocus(true);

  if (!closeWhenMenuButtonIsTabbed) {
    console.log("clear!!");
    clearTimeout(containerFocusTimeoutId!);
  }
  menuBtnEl!.addEventListener("keydown", onKeydownMenuButtonRef);
  menuBtnEl!.addEventListener("blur", onBlurMenuButtonRef, { once: true });
};

export const runAriaExpanded = (state: TLocalState, open: boolean) => {
  const { useAriaExpanded, menuBtnEl } = state;

  if (!useAriaExpanded) return;
  menuBtnEl!.setAttribute("aria-expanded", `${open}`);
};
