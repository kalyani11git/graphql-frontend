import React, { useState } from "react";
import '../App.css';
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import images from "../Components/images.jpg";

// Define GraphQL Mutation
const ADD_BOOKING = gql`
  mutation AddBooking(
    $name: String!
    $email: String!
    $from: String!
    $to: String!
    $adults: Int!
    $children: Int!
  ) {
    addBooking(
      name: $name
      email: $email
      from: $from
      to: $to
      adults: $adults
      children: $children
    ) {
      id
      name
      from
      to
    }
  }
`;

const TravelBookingForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    from: "Australia",
    to: "Singapore",
    adults: 1,
    children: 0,
  });

  const [addBooking, { loading, error }] = useMutation(ADD_BOOKING, {
    update(cache, { data: { addBooking } }) {
      cache.modify({
        fields: {
          getBookings(existingBookings = []) {
            return [...existingBookings, addBooking];
          },
        },
      });
    },
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBooking({
        variables: {
          ...formData,
          adults: parseInt(formData.adults),
          children: parseInt(formData.children),
        },
      });
      alert("Booking submitted successfully!");
      setFormData({
        name: "",
        email: "",
        from: "Australia",
        to: "Singapore",
        adults: 1,
        children: 0,
      });
    } catch (err) {
      console.error("Error submitting booking:", err);
      alert("Error submitting booking");
    }
  };

  const getAllBookings = () => {
    navigate("/bookings"); // Redirect to the Bookings component
  };

  return (
    <div
      className="bodyImage min-h-screen w-screen flex items-center justify-center bg-cover relative"
     
    >
      {/* <div className="bodyImage  inset-0 items-center justify-center bg-cover relative"></div> */}
      <div className="relative bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Travel Booking Form</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-semibold">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">From</label>
              <select name="from" value={formData.from} onChange={handleChange} className="w-full p-2 border rounded-md">
                <option>Australia</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">To</label>
              <select name="to" value={formData.to} onChange={handleChange} className="w-full p-2 border rounded-md">
                <option>Japan</option>
                <option>India</option>
                <option>China</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Adults</label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold">Children</label>
              <input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            {loading ? "Submitting..." : "Submit"}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">Error submitting form. Try again.</p>}
        </form>

        <button
          type="button"
          onClick={getAllBookings}
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Get All Bookings
        </button>
      </div>
    </div>
  );
};

export default TravelBookingForm;
