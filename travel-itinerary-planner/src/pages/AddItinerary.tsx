// import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import ItineraryForm from "../components/Form";
import { Itinerary } from "../dto/itineary";

// Type definition for setItineraries
// interface SetItineraries {
//   setItineraries: (
//     value: Itinerary[] | ((prev: Itinerary[]) => Itinerary[])
//   ) => void;
// }
interface AddItineraryProps {
  addItinerary: (data: Omit<Itinerary, "id">) => void;
}

const AddItinerary = ({ addItinerary }: AddItineraryProps) => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<Omit<Itinerary, "id">>();

  // const startDate = watch("startDate");
  const navigate = useNavigate();

  const onSubmit = (data: Omit<Itinerary, "id">) => {
    console.log("New Itinerary:", data);
    addItinerary(data);

    navigate("/");
  };

  const defaultValues: Itinerary = {
    id: 1,
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    status: "Planned",
    modeOfTransport: "Flight",
    budget: 0,
  };
  return (
    <div className="container mt-5">
      <h3 className="text-center page-heading">Add Itinerary</h3>
      <ItineraryForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}></ItineraryForm>
    </div>
  );
};

export default AddItinerary;
