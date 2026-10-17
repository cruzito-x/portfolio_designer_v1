const TimelineItem = ({ icon, alt, time, title, description }) => {
  return (
    <div className="timeline-item d-flex align-items-center">
      <div className="icon">
        <img src={icon} alt={alt} />
      </div>

      <div className="timeline-content w-100">
        <label className="fw-semibold text-white">{time}</label>

        <h3>{title}</h3>

        <p>{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
