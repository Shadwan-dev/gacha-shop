interface StarRatingProps {
  value: number; // 0 a 5
  max?: number;
  size?: "sm" | "md" | "lg";
  onChange?: (next: number) => void; // si se pasa, es interactivo
}

export function StarRating({
  value,
  max = 5,
  size = "md",
  onChange,
}: StarRatingProps) {
  const sizeClass =
    size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg";

  return (
    <div className={`flex items-center gap-0.5 ${sizeClass}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < value;
        const star = (
          <span className={`star ${filled ? "star-filled" : "star-empty"}`}>
            {filled ? "★" : "☆"}
          </span>
        );

        if (!onChange) return <span key={i}>{star}</span>;

        return (
          <button
            key={i}
            type="button"
            aria-label={`Asignar ${i + 1} estrellas`}
            onClick={() => onChange(i + 1)}
            className="transition-transform hover:scale-110"
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}