import { createSignal, For } from "solid-js";

const SafariBlur = () => {
  const [toggle, setToggle] = createSignal(false);
  const [logs, setLogs] = createSignal<string[]>([]);
  let inputEl!: HTMLInputElement;

  const triggerEvents = ({ byButtonClick }: { byButtonClick: boolean }) => {
    if (toggle()) {
      setToggle(false);
      setTimeout(() => {
        const activeElement = document.activeElement;
        console.log(activeElement);
        setLogs((_prev) => {
          const prev = [..._prev];
          prev.push("input visible");
          prev.push(`is input focused? ${activeElement === inputEl}`);
          return prev;
        });
      });
      return;
    }

    if (byButtonClick) {
      inputEl.focus();
    }
    setLogs((_prev) => {
      const prev = [..._prev];
      prev.push("input focused");
      return prev;
    });

    setTimeout(() => {
      setToggle(true);
      setTimeout(() => {
        const activeElement = document.activeElement;
        console.log(activeElement);
        setLogs((_prev) => {
          const prev = [..._prev];
          prev.push("input display none");
          prev.push(`is input focused? ${activeElement === inputEl}`);
          return prev;
        });
      });
    }, 1500);
  };

  const onBlurInput = () => {
    console.log("input blur event fired");
    setLogs((_prev) => {
      const prev = [..._prev];
      prev.push("input blur event fired");
      return prev;
    });
    setTimeout(() => {
      const activeElement = document.activeElement;
      console.log(activeElement);
      setLogs((_prev) => {
        const prev = [..._prev];
        prev.push(`is input focused? ${activeElement === inputEl}`);
        return prev;
      });
    });
  };
  return (
    <div style="padding-bottom: 200px;">
      <p>
        In Safari, if focused elements become hidden, via "display: none;" or
        "visibility: hidden;" it won't blur, and still retains its focus.
      </p>
      <button
        onClick={() => {
          setToggle(false);
          setLogs([]);
          inputEl.blur();
        }}
      >
        Reset
      </button>
      <div style="height: 200px; border: 1px solid #000; padding: 16px;">
        <div>Logs:</div>
        <For each={logs()}>{(log) => <div>{log}</div>}</For>
      </div>
      <p>Click this text input below to focus VVVV</p>
      <div style={`display: ${toggle() ? "none" : "block"}`}>
        <input
          type="text"
          value="Text input ..."
          ref={inputEl}
          onBlur={onBlurInput}
          onFocus={() => triggerEvents({ byButtonClick: false })}
        />
      </div>
    </div>
  );
};

export default SafariBlur;
