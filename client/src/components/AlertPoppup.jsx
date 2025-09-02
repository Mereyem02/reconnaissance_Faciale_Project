const AlertPopup = ({ type, name }) => (
  <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow">
    ⚠️ {type} détecté pour {name}
  </div>
);

export default AlertPopup;
