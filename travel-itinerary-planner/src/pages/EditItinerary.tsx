import { useNavigate, useParams } from "react-router";
import { Itinerary } from "../dto/itineary";
import ItineraryForm from "../components/Form";

interface EditItineraryProps {
  itineraries: Itinerary[];
  editItinerary: (id: number, data: Omit<Itinerary, "id">) => void;
}
const EditItinerary = ({ itineraries, editItinerary }: EditItineraryProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const itinearyToEdit = itineraries.find(
    (itinerary) => itinerary.id == parseInt(id || "", 10)
  );

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm<Omit<Itinerary, "id">>();

  // const startDate = watch("startDate");
  //pre-fill the form
  // useEffect(() => {
  //   if (itinearyToEdit) {
  //     reset(itinearyToEdit);
  //   }
  // }, [itinearyToEdit, reset]);

  if (!itinearyToEdit) {
    return <p className="text-dange">Itinerary Not Found!</p>;
  }

  console.log(itineraries);

  const onSubmit = (data: Omit<Itinerary, "id">) => {
    editItinerary(parseInt(id || "", 10), data);
    navigate("/");
  };
  const changeDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };
  return (
    <div className="container mt-5">
      <h3 className="text-center page-heading">Edit your existing Itinerary</h3>
      <ItineraryForm
        defaultValues={{
          ...itinearyToEdit,
          startDate: changeDate(itinearyToEdit.startDate),
          endDate: changeDate(itinearyToEdit.endDate),
        }}
        onSubmit={onSubmit}></ItineraryForm>
    </div>
  );
};

export default EditItinerary;
