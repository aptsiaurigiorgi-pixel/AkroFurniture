import img1 from "./assets/photo1.jpg";
import img2 from "./assets/photo2.jpg";
import carousel2 from "./assets/icons/carousel2.jpg";
import carousel3 from "./assets/icons/carousel3.jpg";
import carousel1 from "./assets/icons/carousel1.jpg";
import carousel4 from "./assets/icons/carousel4.jpg";
import carousel5 from "./assets/icons/carousel5.jpg";
import carousel6 from "./assets/icons/carousel6.jpg";
function Food() {
  return (
    <main className="main-content1">
      <div className="main">
        <div className="left">
          <img src={img1} alt="" />
        </div>
        <div className="right">
          <h2>Drift Away</h2>
          <p>Modern doesn't mean cold. Discover warmth in minimalist form.</p>
          <button>Build your dreams </button>
        </div>
      </div>
      <hr />
      <section>
        <img
          src={carousel1}
          alt=""
          style={{
            height: "200px",
            width: "150px",
          }}
        />
        <img
          src={carousel2}
          alt=""
          style={{
            height: "300px",
            width: "250px",
          }}
        />
        <img
          src={carousel3}
          alt=""
          style={{
            height: "400px",
            width: "350px",
          }}
        />
        <img
          src={carousel4}
          alt=""
          style={{
            height: "400px",
            width: "350px",
          }}
        />
        <img
          src={carousel5}
          alt=""
          style={{
            height: "300px",
            width: "250px",
          }}
        />
        <img
          src={carousel6}
          alt=""
          style={{
            height: "200px",
            width: "150px",
          }}
        />
      </section>
      <div className="S2">
        <h1>Redefine Modern Living</h1>
        <p>
          Furniture isn’t just objects. It’s the quiet backdrop to your best
          moments. Discover our collection of minimalist essentials: honest
          materials, precise craftsmanship, designed to age beautifully with
          you.
        </p>
      </div>
    </main>
  );
}

export default Food;
