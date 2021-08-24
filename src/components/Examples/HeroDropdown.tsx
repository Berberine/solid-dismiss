import Dismiss from "../../../package/index";
import { createSignal, onMount } from "solid-js";
// ...

const HeroDropdown = () => {
  const [toggle, setToggle] = createSignal(false);
  let btnEl!: HTMLButtonElement;

  return (
    <div style="position: relative;">
      <button class="btn-primary" ref={btnEl}>
        <span class="desktop-content">Click Me!</span>
        <span class="mobile-content">Tap</span>
      </button>
      <Dismiss
        class="hero-dropdown"
        menuButton={btnEl}
        toggle={toggle}
        setToggle={setToggle}
        // closeWhenMenuButtonIsClicked={false}
      >
        <div className="shadow"></div>
        <div class="hero-dropdown-content">
          <p>
            To close: <strong>click</strong> outside, press <code>Esc</code> or
            press <code>Tab</code> until focus is outside of dropdown
          </p>
          <div class="gutters">
            <button className="focus-gutter"></button>
            <button className="focus-gutter"></button>
            <button className="focus-gutter"></button>
          </div>
        </div>
      </Dismiss>
    </div>
  );
};

export default HeroDropdown;
