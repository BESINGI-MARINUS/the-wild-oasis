// import styled from "styled-components";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import type { CabinType } from "../../utils/types";
import { createEditCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

type CabinToEditProps = {
  cabinToEdit?: CabinType;
  // onClose: () => void;
};

function CreateCabinForm({ cabinToEdit }: CabinToEditProps = {}) {
  const isEditSession = Boolean(cabinToEdit?.id);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinType>({ defaultValues: isEditSession ? cabinToEdit : {} });
  const queryClient = useQueryClient();
  const { errors } = formState;

  // 1. Create cabin mutation
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  // 2. Update cabin mutation
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ cabin, id }) => createEditCabin(cabin, id),
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  function onSubmit(data: CabinType) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      console.log("Is Editing Session");
      updateCabin({ cabin: { ...data, image }, id: cabinToEdit.id });
    } else {
      console.log("Creating Cabin");
      createCabin({ ...data, image });
    }
  }

  const isWorking = isCreating || isUpdating;

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
        {/* <Label htmlFor="image">Cabin photo</Label> */}
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Cabin image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          disabled={isWorking}
        >
          Clear Form
        </Button>
        <Button variation="primary" size="medium" disabled={isWorking}>
          {isEditSession ? "Save Changes" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
