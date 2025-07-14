interface ModelCardProps {
  title: string;
  mediaLink: string;
}

export default function ModelCard({ title, mediaLink }: ModelCardProps) {
  return (
    <div className="card w-96 bg-base-100 card-xs shadow-sm">
      <figure>
        <img
          // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          src={mediaLink}
          alt="No Preview"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {
          /* <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p> */
        }
      </div>
    </div>
  );
}
