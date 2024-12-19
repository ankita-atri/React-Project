import { useForm } from "react-hook-form";
import { Itinerary } from "../dto/itineary";
import { useEffect } from "react";

import { Col, Form, Row } from "react-bootstrap";

interface FormProps {
  defaultValues: Omit<Itinerary, "id">;
  onSubmit: (data: Omit<Itinerary, "id">) => void;
}

const ItineraryForm = ({ defaultValues, onSubmit }: FormProps) => {
  //   const { id } = useParams<{ id: string }>();
  //   const navigate = useNavigate();
  //   const [defaultValues, setDefaultValues] = useState<Partial<Itinerary>>({});
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Omit<Itinerary, "id">>({
    defaultValues,
  });

  const startDate = watch("startDate");

  //   const navigate = useNavigate();

  //   const onSubmit = (data: Omit<Itinerary, "id">) => {
  //     console.log("New Itinerary:", data);
  //     addItinerary(data);

  //     navigate("/");
  //   };
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Trip Name"
              {...register("name", { required: "Trip Name is needed!" })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </Col>

          <Col>
            <Form.Label>Destination</Form.Label>
            <input
              type="text"
              className="form-control"
              placeholder="Destnation"
              {...register("destination", {
                required: "Destination is needed!",
              })}
            />
            {errors.destination && (
              <p className="text-danger">{errors.destination.message}</p>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              {...register("startDate", { required: "Start Date is needed!" })}
            />
            {errors.startDate && (
              <p className="text-danger">{errors.startDate.message}</p>
            )}
          </Col>
          <Col>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              {...register("endDate", {
                required: "End Date is needed!",
                validate: (value) =>
                  !startDate ||
                  new Date(value) > new Date(startDate) ||
                  "End Date must be after Start Date",
              })}
            />
            {errors.endDate && (
              <p className="text-danger">{errors.endDate.message}</p>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Label>Status</Form.Label>
            <Form.Select {...register("status")}>
              <option value="Planned">Planned</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label> Mode of Transport</Form.Label>
            <Form.Select {...register("modeOfTransport")}>
              <option value="Flight">Flight</option>
              <option value="Train">Train</option>
              <option value="Others">Others</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Budget</Form.Label>
          <Form.Control
            type="number"
            {...register("budget", {
              required: "Budget is required",
              min: { value: 1, message: "Budget should be greater than 0 " },
            })}
          />
          {errors.budget && (
            <p className="text-danger">{errors.budget.message}</p>
          )}
        </Form.Group>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </>
  );
};

export default ItineraryForm;
