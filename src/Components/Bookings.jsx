import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_BOOKINGS = gql`
  query {
    getBookings {
      id
      name
      from
      to
    }
  }
`;

const Bookings = () => {
  const { loading, error, data } = useQuery(GET_BOOKINGS);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error.message}</p>;

  return (
    <div className="h-screen container mx-auto p-6 bg-gray-500">
      <h2 className="text-2xl font-semibold text-center mb-6">All Bookings</h2>
      <ul className="space-y-4">
        {data.getBookings.map((booking) => (
          <li
            key={booking.id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="font-bold text-lg">{booking.name}</div>
            <p className="text-gray-700">
              Traveling from <span className="font-semibold">{booking.from}</span> to{" "}
              <span className="font-semibold">{booking.to}</span>
            </p>
            <hr className="my-4 border-t-2 border-gray-200" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
