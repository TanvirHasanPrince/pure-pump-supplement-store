"use client";
import { useState } from "react";
import EditableImage from "./EditableImage";
import useProfile from "../useProfile";
import AddressInput from "../../components/layout/AddressInput";

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [houseAddress, setHouseAddress] = useState(user?.houseAddress || "");
  const [city, setCity] = useState(user?.city || "");
  const [postCode, setPostalCode] = useState(user?.postCode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "houseAddress") setHouseAddress(value);
    if (propName === "city") setCity(value);
    if (propName === "postCode") setPostalCode(value);
    if (propName === "country") setCountry(value);
  }

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
              admin,
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
          <AddressInput
            addressProps={{ phone, houseAddress, postCode, city, country }}
            setAddressProp={handleAddressChange}
          ></AddressInput>
          {loggedInUserData?.admin && (
            <div>
              <label
                className="p-2 inline-flex items-center gap-2  mb-4"
                htmlFor="adminCheckBox"
              >
                <input
                  className=""
                  id="adminCheckBox"
                  type="checkbox"
                  value={"1"}
                  checked={admin}
                  onClick={(ev) => setAdmin(ev.target.checked)}
                />
                <span>Admin</span>
              </label>
            </div>
          )}

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
