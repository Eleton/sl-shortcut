const LineNumber = ({ designation }: { designation: string }) => {
  if (["13", "14"].includes(designation)) {
    return <span className="font-bold text-red-700">{designation}</span>;
  }
  if (["1", "4"].includes(designation)) {
    return <span className="font-bold text-red-400">{designation}</span>;
  }
  return <span className="font-bold text-blue-500">{designation}</span>;
};

export default LineNumber;
