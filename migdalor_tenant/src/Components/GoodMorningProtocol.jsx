import React from 'react';
import '../CSS/GoodMorningProtocol.css';

const GoodMorningProtocol =()=>{
    const handleClick = () => {
    alert('הנוהל בוצע בהצלחה');
  };

  return (
    <div>
        <h1>נוהל בוקר טוב</h1>
      <h2>בוקר טוב שושנה</h2>
      <h3>אנא לחצ/י על הכפתור כדי לבצע את הנוהל</h3>
      <button onClick={handleClick}>בוקר טוב</button> 
    </div>
  );
}

export default GoodMorningProtocol;
