export default function Heading({
  headingName,
  headingDescription,
}: {
  headingName: string;
  headingDescription: string;
}) {
  return (
    <div className="py-10 grid">
      <h1 className="text-white font-Bebas text-6xl place-self-center">
        {headingName}
      </h1>
      <p className="text-white font-Outfit text-xs place-self-center">
        {headingDescription}
      </p>
    </div>
  );
}
