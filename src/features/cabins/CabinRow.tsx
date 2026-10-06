import styled from "styled-components";
import type { CabinType } from "../../utils/types";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";

import {
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }: { cabin: CabinType }) {
  const { id, image, regularPrize, discount, description, name, maxCapacity } =
    cabin;
  const imageUrl = image instanceof File ? URL.createObjectURL(image) : image;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating: isDuplicating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      cabin: {
        name: `Copy of ${name}`,
        image,
        regularPrize,
        discount,
        description,
        maxCapacity,
      },
    });
  }

  return (
    <Table.Row>
      <Img src={imageUrl as string} alt={description} />
      <Cabin>{name}</Cabin>
      <div>Up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrize)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id as string} />

            <Menus.List id={id as string}>
              <Menus.Button
                icon={<Square2StackIcon />}
                onClick={handleDuplicate}
                disabled={isDuplicating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="editForm">
                <Menus.Button icon={<PencilIcon />}>Update</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<TrashIcon />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="editForm">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                onConfirm={() => deleteCabin(id as string)}
                resourceName="cabin"
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
