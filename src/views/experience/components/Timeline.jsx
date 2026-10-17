import TimelineItem from "@/views/experience/components/TimelineItem";

const Timeline = ({ items }) => {
  return (
    <div className="timeline w-100 mb-5">
      {items.map((item, index) => (
        <TimelineItem key={`${item.title}-${index}`} {...item} />
      ))}
    </div>
  );
};

export default Timeline;
