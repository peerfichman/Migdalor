import React from 'react';

const SendMeassge= () => (
  <div>
    <h1>מילוי פרטים</h1>
    <form>
      <label>
        שם:
        <input type="text" name="name" />
      </label>
      <br />
      <label>
        אימייל:
        <input type="email" name="email" />
      </label>
      <br />
      <input type="submit" value="שלח" />
    </form>
  </div>
);

export default SendMeassge;