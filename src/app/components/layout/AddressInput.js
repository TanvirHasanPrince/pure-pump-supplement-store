const AddressInput = ({ addressProps, setAddressProp, disabled = false }) => {
  const { phone, houseAddress, city, postCode, country } = addressProps;

  return (
    <>
      <label> Phone number</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(ev) => setAddressProp("phone", ev.target.value)}
      />
      <label> House Address</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="House address"
        value={houseAddress}
        onChange={(ev) => setAddressProp("houseAddress", ev.target.value)}
      />

      <div className="flex gap-2">
        <div>
          <label> City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProp("city", ev.target.value)}
          />
        </div>
        <div>
          <label> Post Code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal code"
            value={postCode}
            onChange={(ev) => setAddressProp("postCode", ev.target.value)}
          />
        </div>
      </div>

      <label> Country</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country}
        onChange={(ev) => setAddressProp("country", ev.target.value)}
      />
    </>
  );
};

export default AddressInput;
