import { useParams } from "react-router-dom";

export default function GymDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Gym Details - ID: {id}</h1>
    </div>
  );
}
