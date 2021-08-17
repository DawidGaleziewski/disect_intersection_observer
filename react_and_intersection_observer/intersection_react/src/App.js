import React from "react";
import "./App.css";

// This may be a problem if we do a condition rendering of that component. It works due the fact that it runs when component is rendered so the ref happens to be in place
function useOnScreenWithRef(options) {
  const ref = React.useRef();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      console.log("entry is: ", entry);
      setVisible(entry.isIntersecting);
    }, options);

    //As sometimes there will be no dome element and we do not want to fire observer then
    if (ref.current) {
      // starts intersection observer observing dom element on the screen
      observer.observe(ref.current);
    }

    // We want to unobserver on dismount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  // on this hook end we want to return the ref and if the element on the screen is visible or not
  return [ref, visible];
}

function useOnScreen(options) {
  // In this example we will return setRef. It works due the fact that ref can accept eaither refference or a function that will be called and pass the referance of the dom object to it
  const [ref, setRef] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      console.log("entry is: ", entry);
      setVisible(entry.isIntersecting);
    }, options);

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [setRef, options]);

  return [setRef, visible];
}

function App() {
  // We need a ref to know when elemnt is on the screen
  const options = {
    rootMargin: "-300px",
    treshold: 0.5,
  };
  // const [ref, visible] = useOnScreenWithRef(options);

  const [setRef, visible] = useOnScreen(options);

  return (
    <div className="App">
      <section className="section-1">
        <h2 className="header">Section 1</h2>
      </section>
      <section className="section-2">
        <h2 className="header">Section 2</h2>
      </section>
      <section
        ref={setRef}
        style={{
          backgroundColor: visible ? "crimson" : "blanchedalmond",
        }}
        className="section-3"
      >
        <h2 className="header">Section 3</h2>
        {visible && <p>Howdy, I am intersecting</p>}
      </section>
      <section className="section-4">
        <h2 className="header">Section 4</h2>
      </section>
      <section className="section-5">
        <h2 className="header">Section 5</h2>
      </section>
    </div>
  );
}

export default App;
