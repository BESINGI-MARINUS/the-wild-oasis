// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button variation="primary" size="medium">
          Add Cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens="cabins-table">
        <Button variation="primary" size="medium">
          View Cabins
        </Button>
      </Modal.Open>
      <Modal.Window name="cabins-table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}

// INITIAL IMPLEMENTATION BEFORE COMPOUND COMPONENT
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button
//         variation="primary"
//         size="medium"
//         onClick={() => setIsOpenModal(true)}
//       >
//         Create new Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={setIsOpenModal}>
//           <CreateCabinForm onCloseModal={setIsOpenModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
