import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EyeCloseIcon, EyeIcon, } from "../../../icons";
import Button from "../../ui/button/Button.tsx";
// import Spinner from "../../ui/spinner/Spinner.tsx";

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);

  // const handleSelectChange = (value: string) => {
  //   console.log("Selected value:", value);
  // };

  return (
    <ComponentCard className="w-[100%]" title="Create Sub admin">
      <div className="space-y-6 flex space-x-4  item-center ">
        <div className="w-[33.5%]">
          <Label htmlFor="input">Name</Label>
          <Input type="text" id="input" />
        </div>
        <div className="w-[33.5%]">
          <Label htmlFor="inputTwo">Email</Label>
          <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
        </div>

        <div className="w-[33.5%]">
          <Label>Password for sub admin</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
        </div>

      </div>

      {/* <Button className="flex justify-center w-[8%] items-center">Save</Button> */}
      <div className="flex justify-end">
        <Button className="w-[8%] flex items-center justify-center " size="sm"  >
          {/* {loading ? (
            <>
              <Spinner />
              saving...
            </> */}
          {/* ) : ( */}
          {/* )} */}
            Save
        </Button>
      </div>



    </ComponentCard>
  );
};