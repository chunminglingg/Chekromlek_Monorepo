import React from "react";
import FormPost from "../FormPost";
interface ModalProps {
  setModalState: (state: boolean) => void;
}
const ShowModal: React.FC<ModalProps> = (props) => {
  return (
    <div className="shadow-lg ">
      <div className=" fixed inset-3 flex justify-center items-center z-10 max-sm:w-auto  max-sm:translate-x-42 max-sm:mt-[12%] mt-[5%] ">
        <div className=" bg-gray-100 w-[545px] h-[480px] max-sm:w-[350px] max-sm:h-[480px] text-black  rounded-md border-gray-200">
          <div  className=" flex items-end justify-end me-2 mt-1">
            <button
              onClick={() => props.setModalState(false)}>

              <div className="hover:bg-slate-300 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentcolor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                />
              </svg>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-center">
            <FormPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
