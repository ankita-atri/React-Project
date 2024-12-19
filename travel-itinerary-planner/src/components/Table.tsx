import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Itinerary } from "../dto/itineary";
import { useNavigate } from "react-router";
import { Badge, Button, Modal } from "react-bootstrap";
import { useState } from "react";

interface TableProps {
  data: Itinerary[];
  deleteItinerary: (id: number) => void;
}

const Table = ({ deleteItinerary, data }: TableProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleShowPopUp = (id: number) => {
    setSelectedId(id);
    setShowPopUp(true);
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      deleteItinerary(selectedId);
    }
    setShowPopUp(false);
  };

  const handleCancel = () => {
    setShowPopUp(false);
    setSelectedId(null);
  };

  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Itinerary>();
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Planned":
        return "primary";
      case "In-Progress":
        return "warning";
      case "Completed":
        return "success";
      default:
        return "default";
    }
  };

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("destination", {
      header: "Destination",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("startDate", {
      header: "Start Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("endDate", {
      header: "End Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        // info.getValue(),
        <Badge bg={getStatusClass(info.getValue<string>())} className="fs-6">
          {info.getValue<string>()}
        </Badge>
      ),
    }),
    columnHelper.accessor("modeOfTransport", {
      header: "Mode Of Transport",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("budget", {
      header: "Budget ($)",
      cell: (info) => info.getValue(),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="table-responsive mt-4">
        <table className="table table-bordered align-middle table-hover">
          <thead className="table-dark text-center">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
                <th>Details</th>
                <th>Actions</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className="text-center" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={
                      cell.column.id === "status"
                        ? getStatusClass(cell.getValue<string>())
                        : ""
                    }>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() =>
                      navigate(`view-itinerary/${row.original.id}`)
                    }>
                    View
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-info btn-sm"
                    onClick={() =>
                      navigate(`edit-itinerary/${row.original.id}`)
                    }>
                    Edit
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      // deleteItinerary(row.original.id);
                      handleShowPopUp(row.original.id);
                    }}>
                    Delete
                  </button>
                  <Modal>Hello</Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showPopUp} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Table;
