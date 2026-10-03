// import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import type { CabinType } from "../../utils/types";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabine";

type CreateCabinFormProps = {
  cabinToEdit?: CabinType;
  onCloseModal?: () => void;
};

// type CabinFormValues = Omit<CabinType, "image"> & {
//   image: CabinType["image"] | FileList;
// };

function CreateCabinForm({
  cabinToEdit,
  onCloseModal,
}: CreateCabinFormProps = {}) {
  const isEditSession = Boolean(cabinToEdit?.id);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinType>({
      defaultValues: isEditSession ? cabinToEdit : {},
    });
  const { errors } = formState;

  // 1. Create cabin mutation
  const { createCabin, isCreating } = useCreateCabin();

  // 2. Update cabin mutation
  const { updateCabin, isUpdating } = useUpdateCabin();

  function onSubmit(data: CabinType) {
    const image =
      data.image instanceof FileList
        ? (data.image.item(0) ?? cabinToEdit?.image)
        : data.image;

    if (!image) throw new Error("Cabin image is required");

    if (isEditSession) {
      updateCabin({ cabin: { ...data, image }, id: cabinToEdit?.id as string });
    } else {
      // createCabin === mutate fxn, and we passed the second object of options because the reset function was no longer available in the custom useCreateCabin hook. so react query gives us this second option...
      createCabin(
        { cabin: { ...data, image } },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }

  const isWorking = isCreating || isUpdating;

  // function onError(error) {
  //   console.log(error);
  // }

  return (
    <Form
      // onSubmit={handleSubmit(onSubmit, onError)}
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Cabin name is required" })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "The Maximum Capacity is required",
            min: {
              value: 1,
              message: "The maximum capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrize?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrize", {
            required: "The Cabin Price is required",
            min: {
              value: 1,
              message: "The cabin price should be at least $1",
            },
          })}
        />
      </FormRow>

      <FormRow label=" Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              value <= getValues().regularPrize ||
              "Discount can not be greater than regular price ",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "Description is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Cabin image is required",
          })}
        />
      </FormRow>

      <FormRow>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            variation="secondary"
            size="medium"
            type="reset"
            disabled={isWorking}
            onClick={() => onCloseModal?.()}
          >
            Clear Form
          </Button>
          <Button variation="primary" size="medium" disabled={isWorking}>
            {isEditSession ? "Save Changes" : "Create Cabin"}
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
