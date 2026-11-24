import { useForm } from "react-hook-form";

import { TIMES } from "../data/tonight.js";
import RenderBadge from "./RenderBadge.jsx";

function BookingForm({ onBook }) {
  // register connects inputs; handleSubmit wraps our submit function
  const { register, handleSubmit, reset } = useForm();

  function saveBooking(data) {
    console.log(JSON.stringify(data, null, 2));

    const booking = {
      id: crypto.randomUUID(),
      ...data,
      partySize: Number(data.partySize),
    };

    onBook(booking);

    // clear so it empty again
    reset();
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2 className="panel-title">Book a table</h2>
        <RenderBadge />
      </div>
      <form className="booking-form" onSubmit={handleSubmit(saveBooking)}>
        <div className="field">
          <label className="field-label" htmlFor="name">Name</label>
          <input
            id="name"
            className="input"
            {...register("name")}
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="phone">Phone</label>
          <input
            id="phone"
            className="input"
            type="tel"
            {...register("contact.phone")}
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            type="email"
            {...register("contact.email")}
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label className="field-label" htmlFor="partySize">Party size</label>
            <input
              id="partySize"
              className="input"
              type="number"
              min="1"
              max="12"
              {...register("partySize")}
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="time">Time</label>
            <select
              id="time"
              className="input"
              {...register("time")}
            >
              <option value="">Choose a time</option>
              {TIMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <span className="field-label">Seating</span>

          {/* all three radios share the name "seating", so only one can be picked */}
          <label>
            <input type="radio" value="indoor" {...register("seating")} />
            Indoor
          </label>
          <label>
            <input type="radio" value="patio" {...register("seating")} />
            Patio
          </label>
          <label>
            <input type="radio" value="bar" {...register("seating")} />
            Bar
          </label>
        </div>

        <div className="field">
          <label>
            <input type="checkbox" {...register("celebrating")} />
            Celebrating
          </label>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            className="input"
            rows="3"
            {...register("notes")}
          />
        </div>

        <button className="book-button">Book the table</button>
      </form>
    </section>
  );
}

export default BookingForm;