const Card = ({ label, value, bgColor }) => {
  return (
    <div className={`card p-4 rounded-xl shadow-md text-white ${bgColor}`}>
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-6xl font-bold">{value || 0}</p>
          <p className="font-medium">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
