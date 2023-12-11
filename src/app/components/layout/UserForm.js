"use client";
import { useState } from "react";
import EditableImage from "./EditableImage";

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [houseAddress, setHouseAddress] = useState(user?.houseAddress || "");
  const [city, setCity] = useState(user?.city || "");
  const [postCode, setPostalCode] = useState(user?.postCode || "");
  const [country, setCountry] = useState(user?.country || "");

  return (
    <div className="flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w[120px]">
          <EditableImage link={image} setLink={setImage}></EditableImage>
        </div>
        <form
          className="grow"
          onSubmit={(ev) =>
            onSave(ev, {
             name: userName,
              image,
              phone,
              houseAddress,
              city,
              postCode,
              country,
            })
          }
        >
          <label>Name</label>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
          />

          <label>Email</label>
          <input
            disabled
            type="email"
            placeholder="Your Name"
            value={user?.email}
          />
          <label> Phone number</label>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
          <label> House Address</label>
          <input
            type="text"
            placeholder="House address"
            value={houseAddress}
            onChange={(ev) => setHouseAddress(ev.target.value)}
          />

          <div className="flex gap-2">
            <div>
              <label> City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
              />
            </div>
            <div>
              <label> Post Code</label>
              <input
                type="text"
                placeholder="Postal code"
                value={postCode}
                onChange={(ev) => setPostalCode(ev.target.value)}
              />
            </div>
          </div>

          <label> Country</label>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(ev) => setCountry(ev.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
